using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Types.DatabaseContext;
using Types.DTOs;
using Types.Enums;
using Types.TestService;

namespace Repositories
{
    public class TestRepository : BaseRepository<Test>, ITestRepository
    {
        private readonly Random _random;

        public TestRepository(AutoQuizzerContext context) : base(context)
        {
            _random = new Random();
        }

        public async Task<bool> CreateTestAsync(CreateTestRequest request, int userId)
        {
            var subcategories = await _context.Categories
                .Where(x => x.UserId == userId && request.Categories.Contains(x.CategoryId))
                .Include(x => x.Subcategories)
                .ThenInclude(x => x.Questions)
                .SelectMany(x => x.Subcategories)
                .ToListAsync();

            var filteredSubcategories = new List<Subcategory>();

            if(subcategories.Any(x => request.Subcategories.Contains(x.SubcategoryId)))
            {
                filteredSubcategories.AddRange(subcategories.Where(x => request.Subcategories.Contains(x.SubcategoryId)));
            }

            filteredSubcategories.AddRange(subcategories.Where(x => !filteredSubcategories.Any(y => y.CategoryId == x.CategoryId)));

            //subcategories = subcategories.Where(x => request.Subcategories.Contains(x.SubcategoryId)).ToList();

            subcategories = filteredSubcategories;

            var questionsByDifficulty = subcategories.SelectMany(x => x.Questions).ToList()
                .GroupBy(y => y.Difficulty)
                .ToDictionary(g => g.Key, g => g.ToList());

            if (!AssertThereAreEnoughtQuestions(request.QuestionsNumber, questionsByDifficulty))
                return false;

            var selectedQuestionIds = SelectRandomQuestions(request, questionsByDifficulty);

            var test = new Test
            {
                Title = request.Title.Trim(),
                Subject = request.Subject.Trim(),
                Difficulty = request.Difficulty.ToString(),
                QuestionsNumber = request.QuestionsNumber,
                Categories = string.Join(",", request.Categories),
                Subcategories = string.Join(",", request.Subcategories),
                ExaminerId = userId
            };

            test.TestQuestions = new List<TestQuestion>();
            foreach(var question in selectedQuestionIds)
            {
                var testQuestion = new TestQuestion()
                {
                    TestId = test.TestId,
                    QuestionId = question
                };

                test.TestQuestions.Add(testQuestion);
            }
            
            var addedTest = await _context.Tests.AddAsync(test);

            if (request.UsersToAssign.Any())
                return await AssignTestAsync(request.UsersToAssign, test);

            return true;
        }

        private List<int> SelectRandomQuestions(CreateTestRequest request, Dictionary<string, List<Question>> questionsByDifficulty)
        {
            var randomQuestionIds = new List<int>();
            if (questionsByDifficulty.TryGetValue(request.Difficulty.ToString(), out var filteredQuestion))
            {
                var remainingSlots = Math.Min(request.QuestionsNumber, filteredQuestion.Count);
                randomQuestionIds.AddRange(GetRandomQuestionsFromList(filteredQuestion, remainingSlots).Select(x => x.QuestionId));
                request.QuestionsNumber -= remainingSlots;
            }

            // Fill the remaining slots with questions from other difficulties
            var otherDifficulties = questionsByDifficulty.Keys.Where(d => d != request.Difficulty.ToString()).ToList();
            while (request.QuestionsNumber > 0 && otherDifficulties.Any())
            {
                var randomDifficulty = otherDifficulties[_random.Next(0, otherDifficulties.Count)];

                if (questionsByDifficulty.TryGetValue(randomDifficulty, out var otherQuestions))
                {
                    var remainingSlots = Math.Min(request.QuestionsNumber, otherQuestions.Count);
                    randomQuestionIds.AddRange(GetRandomQuestionsFromList(otherQuestions, remainingSlots).Select(x => x.QuestionId));
                    request.QuestionsNumber -= remainingSlots;
                }

                otherDifficulties.Remove(randomDifficulty);
            }

            return randomQuestionIds;
        }

        private List<Question> GetRandomQuestionsFromList(List<Question> questions, int count)
        {
            var randomQuestions = new List<Question>();
            var usedIndexes = new HashSet<int>();

            while (randomQuestions.Count < count)
            {
                var index = _random.Next(0, questions.Count);

                // If we have already used this index, find another one
                while (usedIndexes.Contains(index))
                {
                    index = _random.Next(0, questions.Count);
                }

                var randomQuestion = questions[index];
                randomQuestions.Add(randomQuestion);

                // Mark the index as used
                usedIndexes.Add(index);

                // If we have used all available indexes, reset the usedIndexes set
                if (usedIndexes.Count == questions.Count)
                {
                    usedIndexes.Clear();
                }
            }

            return randomQuestions;
        }

        private bool AssertThereAreEnoughtQuestions(int requestedQuestions, Dictionary<string, List<Question>> questions)
        {
            int count = 0;
            foreach(var key in questions)
            {
                count += key.Value.Count;
            }

            return count >= requestedQuestions;
        }

        public async Task<bool> AssignTestAsync(string[] usersToAssign, Test test)
        {
            var users = await _context.Users.Where(user => (usersToAssign.Contains(user.Username) 
                || usersToAssign.Contains(user.Email)) 
                && user.UserRole == UserRole.Student.ToString()).Include(x => x.Exams)
                .ToListAsync();

            users = users.Where(x => x.Exams.Where(x => x.TestId == test.TestId).Count() == 0).ToList();

            if (!users.Any())
                return false;

            foreach (var user in users)
            {
                var exam = new Exam()
                {
                    AssignmentDate = DateTime.Now,
                    TestId = test.TestId,
                    UserId = user.UserId
                };

                test.Exams.Add(exam);
            }

            return true;
        }

        public async Task<bool> AssignTestAsync(AssignTestRequest request, int userId)
        {
            var test = await _context.Tests.FirstOrDefaultAsync(x => x.TestId == request.TestId && x.ExaminerId == userId);
            if (test == null)
                return false;

            return await AssignTestAsync(request.UsersToAssign, test);
        }

        public async Task<List<TestDTO>> FetchTestsAsync(int userId, string difficulty)
        {
            var testsDTO = new List<TestDTO>();

            var tests = await _context.Tests.Where(x => x.ExaminerId == userId).ToListAsync();
            if(difficulty != "None")
                tests = tests.Where(x => x.Difficulty == difficulty).ToList();

            foreach (var test in tests) 
            {
                testsDTO.Add(new TestDTO
                {
                    TestId = test.TestId,
                    Title = test.Title,
                    Subject = test.Subject,
                    Difficulty = Enum.Parse<Difficulty>(test.Difficulty),
                    QuestionsNumber = test.QuestionsNumber,
                    Categories = test.Categories,
                    Subcategories = test.Subcategories
                });
            }

            return testsDTO;
        }

        public async Task<bool> UpdateTestAsync(UpdateTestRequest request, int userId)
        {
            var test = await _context.Tests.FirstOrDefaultAsync(x => x.TestId == request.TestId && x.ExaminerId == userId);
            if (test == null)
                return false;

            test.Title = request.Title;
            test.Subject = request.Subject;

            _context.Tests.Update(test);
            return true;
        }

        public async Task<bool> DeleteTestAsync(int testId, int userId)
        {
            var test = await _context.Tests.FirstOrDefaultAsync(x => x.TestId == testId && x.ExaminerId == userId);
            if (test == null) { return false; }

            _context.Tests.Remove(test);
            _context.Exams.RemoveRange(test.Exams.Where(x => x.TestId == test.TestId));
            return true;
        }

        public async Task<List<TestUsersDTO>> FetchTestUsersAsync(int userId, int testId)
        {
            var users = await _context.Tests.Where(x => x.TestId == testId && x.ExaminerId == userId)
                .Include(x => x.Exams).ThenInclude(x => x.User).SelectMany(x => x.Exams).ToListAsync();

            var orderedStandings = _context.Exams.Where(x => x.Grade != null && x.TestId == testId).ToList()
                .OrderByDescending(x => x.Grade).ToList();

            var list = new List<TestUsersDTO>();
            foreach(var user in users)
            {
                var index = orderedStandings.IndexOf(orderedStandings.FirstOrDefault(x => x.UserId == user.UserId));
                int? standing = (index != -1) ? index + 1 : null;
                var testUser = new TestUsersDTO
                {
                    TestId = testId,
                    ExamId = user.ExamId,
                    AssignmentDate = user.AssignmentDate,
                    ResolvedDate = user.ResolvedDate,
                    Grade = user.Grade,
                    Standing = standing,
                    UserId = Convert.ToInt32(user.UserId),
                    Email = user.User.Email,
                    Fullname = user.User.FirstName + " " + user.User.LastName,
                    UserName = user.User.Username
                };

                list.Add(testUser);
            }

            return list;
        }

        public async Task<bool> DeleteTestAssignmentAsync(DeleteTestAssignmentRequest request, int userId)
        {
            var test = await _context.Tests.Where(x => x.TestId == request.TestId && x.ExaminerId == userId).Include(x => x.Exams).FirstOrDefaultAsync();
            if (test == null) { return false; }

            var exam = test.Exams.Where(x => x.UserId == request.UserId && x.ExamId == request.ExamId).FirstOrDefault();

            _context.Exams.Remove(exam);
            return true;
        }

        public async Task<List<UserExamsDTO>> FetchUserExamsAsync(int userId, string difficulty)
        {
            var exams = await _context.Exams.Where(x => x.UserId == userId)
                .Include(x => x.Test).Include(x => x.User).ToListAsync();

            if(difficulty != "None")
                exams = exams.Where(x => x.Test.Difficulty == difficulty).ToList();

            var list = exams.Select(x => new UserExamsDTO
            {
                ExamId = x.ExamId,
                AssignmentDate = x.AssignmentDate,
                ResolvedDate = x.ResolvedDate,
                Grade = x.Grade,
                Test = new TestDTO
                {
                    TestId = x.Test.TestId,
                    Difficulty = Enum.Parse<Difficulty>(x.Test.Difficulty),
                    QuestionsNumber = x.Test.QuestionsNumber,
                    Categories = x.Test.Categories,
                    Subcategories = x.Test.Subcategories,
                    Subject = x.Test.Subject,
                    Title = x.Test.Title,
                    ExaminerId = x.Test.ExaminerId
                }
            }).ToList();

            foreach(var exam in list)
            {
                var examiner = await _context.Users.FirstOrDefaultAsync(x => x.UserId == exam.Test.ExaminerId);
                var examinerFullName = examiner.FirstName + " " + examiner.LastName;

                exam.ExaminerFullname = examinerFullName;

                var orderedStandings = _context.Exams.Where(x => x.Grade != null && x.TestId == exam.Test.TestId).ToList()
                .OrderByDescending(x => x.Grade).ToList();

                var index = orderedStandings.IndexOf(orderedStandings.FirstOrDefault(x => x.UserId == userId));
                exam.Standing = (index != -1) ? index + 1 : null;
            }

            return list;
        }

        public async Task<List<QuestionFullDTO>> FetchExamQuestionsAsync(int userId, int examId)
        {
            var testQuestions = await _context.Exams.Where(x => x.UserId == userId && x.ExamId == examId)
                .Include(x => x.Test)
                .ThenInclude(x => x.TestQuestions)
                .ThenInclude(x => x.Question)
                .ThenInclude(x => x.QuestionAnswers)
                .SelectMany(x => x.Test.TestQuestions)
                .ToListAsync();

            var list = new List<QuestionFullDTO>();
            if (!testQuestions.Any())
                return list;

            foreach (var testQuestion in testQuestions)
            {
                var question = new QuestionFullDTO
                {
                    QuestionId = testQuestion.Question.QuestionId,
                    Description = testQuestion.Question.Description,
                    Difficulty = Enum.Parse<Difficulty>(testQuestion.Question.Difficulty),
                    Choises = testQuestion.Question.QuestionAnswers.Select(y => new QuestionAnswerChoicesDTO
                    {
                        AnswerId = y.AnswerId,
                        Description = y.Description
                    }).ToList()
                };

                list.Add(question);
            }

            return list;
        }

        public async Task<ExamResultDTO> ValidateExamAnswersAsync(int userId, List<UserAnswer> request)
        {
            var testQuestions = await _context.Exams.Where(x => x.UserId == userId && x.ExamId == request.FirstOrDefault().ExamId)
                .Include(x => x.Test)
                .ThenInclude(x => x.TestQuestions)
                .ThenInclude(x => x.Question)
                .ThenInclude(x => x.QuestionAnswers)
                .SelectMany(x => x.Test.TestQuestions)
                .ToListAsync();

            var result = new ExamResultDTO();
            if (!testQuestions.Any())
                return result;

            foreach (var answer in request)
            {
                var testQuestion = testQuestions.FirstOrDefault(x => x.QuestionId == answer.QuestionId);

                var correctAnswer = testQuestion.Question?.QuestionAnswers?.FirstOrDefault(x => Convert.ToBoolean(x.IsCorrect))?.AnswerId;

                var wasCorrect = 0;
                if (correctAnswer == answer.UserOption)
                {
                    result.CorrectAnswers += 1;
                    wasCorrect = 1;
                }

                var detail = new ExamDetail
                {
                    ExamId = answer.ExamId,
                    TestQuestionId = testQuestion.TestQuestionId,
                    UserQuestionAnswer = answer.UserOption,
                    WasCorrect = Convert.ToInt16(wasCorrect)
                };

                _context.ExamDetails.Add(detail);
            }

            result.Grade = Convert.ToInt32((result.CorrectAnswers * 100 / testQuestions.Count));
            result.ExamId = request.FirstOrDefault().ExamId;

            var exam = await _context.Exams.Where(x => x.UserId == userId && x.ExamId == request.FirstOrDefault().ExamId)
                .Include(x => x.ExamDetails).FirstOrDefaultAsync();

            exam.ResolvedDate = DateTime.Now;
            exam.Grade = result.Grade;
            _context.Exams.Update(exam);

            var orderedStandings = _context.Exams.Where(x => x.Grade != null).ToList()
                .OrderByDescending(x => x.Grade).ToList();

            var index = orderedStandings.IndexOf(orderedStandings.First(x => x.UserId == userId));
            result.Standing = index + 1;

            return result;
        }
    }
}
