using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
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

            users = users.Where(x => x.Exams.Count == 0).ToList();

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

            return users.Select(x => new TestUsersDTO
            {
                TestId = testId,
                ExamId = x.ExamId,
                AssignmentDate = x.AssignmentDate,
                ResolvedDate = x.ResolvedDate,
                Grade = x.Grade,
                UserId = Convert.ToInt32(x.UserId),
                Email = x.User.Email,
                Fullname = x.User.FirstName + " " + x.User.LastName,
                UserName = x.User.Username
            }).ToList();
        }

        public async Task<bool> DeleteTestAssignmentAsync(DeleteTestAssignmentRequest request, int userId)
        {
            var test = await _context.Tests.Where(x => x.TestId == request.TestId && x.ExaminerId == userId).Include(x => x.Exams).FirstOrDefaultAsync();
            if (test == null) { return false; }

            var exam = test.Exams.Where(x => x.UserId == request.UserId && x.ExamId == request.ExamId).FirstOrDefault();

            _context.Exams.Remove(exam);
            return true;
        }
    }
}
