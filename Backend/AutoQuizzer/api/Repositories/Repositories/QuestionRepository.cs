using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Types.DatabaseContext;
using Types.DTOs;
using Types.Enums;
using Types.QuestionService;

namespace Repositories
{
    public class QuestionRepository : BaseRepository<Question>, IQuestionRepository
    {
        public QuestionRepository(AutoQuizzerContext context) : base(context)
        {
        }

        public async Task<List<QuestionDTO>> FetchQuestionsAsync(int userId, int categoryId, int subcategoryId)
        {
            var result = new List<QuestionDTO>();
            var subcategories = await _context.Categories.Where(x => x.UserId == userId && ((categoryId != 0) ? x.CategoryId == categoryId : true))
                .Include(x => x.Subcategories.Where(x => (subcategoryId != 0) ? x.SubcategoryId == subcategoryId : true))
                .ThenInclude(x => x.Questions)
                .ThenInclude(x => x.QuestionAnswers)
                .SelectMany(x => x.Subcategories)
                .ToListAsync();

            if(subcategoryId != 0)
            {
                subcategories = subcategories.Where(x => x.SubcategoryId == subcategoryId).ToList();
            }

            foreach(var subcategory in subcategories)
            {
                var questions = subcategory.Questions;
                var category = subcategory.CategoryId;

                result.AddRange(questions.Select(x => new QuestionDTO
                    {
                        QuestionId = x.QuestionId,
                        CategoryId = category,
                        SubcategoryId = x.SubcategoryId,
                        Description = x.Description,
                        Difficulty = Enum.Parse<Difficulty>(x.Difficulty),
                        QuestionAnswers = x.QuestionAnswers.Select(y => new AnswerDTO
                        {
                            AnswerId = y.AnswerId,
                            QuestionId = y.QuestionId,
                            Description = y.Description,
                            IsCorrect = Convert.ToBoolean(y.IsCorrect),
                        }).ToList()
                    })
                );
            }

            return result;
        }

        public async Task<bool> DeleteQuestionAsync(int userId, int categoryId, int subcategoryId, int questionId)
        {
            var subcategories = await _context.Categories.Where(x => x.UserId == userId && x.CategoryId == categoryId)
                .Include(x => x.Subcategories)
                .ThenInclude(x => x.Questions)
                .ThenInclude(x => x.QuestionAnswers)
                .SelectMany(x => x.Subcategories)
                .ToListAsync();

            var question = subcategories.FirstOrDefault(x => x.SubcategoryId == subcategoryId)?.Questions?
                .FirstOrDefault(x => x.QuestionId == questionId);

            _context.Questions.Remove(question);
            return true;
        }

        public async Task<bool> CreateQuestionAsync(CreateQuestionRequest request, int userId)
        {
            var subcategories = await _context.Categories.Where(x => x.UserId == userId && x.CategoryId == request.CategoryId)
                .Include(x => x.Subcategories)
                .ThenInclude(x => x.Questions)
                .ThenInclude(x => x.QuestionAnswers)
                .SelectMany(x => x.Subcategories)
                .ToListAsync();

            var question = subcategories.FirstOrDefault(x => x.SubcategoryId == request.SubcategoryId)?.Questions?
                .FirstOrDefault(x => x.Description == request.Description && x.Difficulty == request.Difficulty.ToString());

            if(question != null) { return false; }

            subcategories.FirstOrDefault(x => x.SubcategoryId == request.SubcategoryId)?.Questions?.Add(new Question
            {
                Description = request.Description,
                SubcategoryId = request.SubcategoryId,
                Difficulty = request.Difficulty.ToString(),
                QuestionAnswers = request.QuestionAnswers.Select(x => new QuestionAnswer
                {
                    Description = x.Description,
                    IsCorrect = Convert.ToInt16(x.IsCorrect)
                }).ToList()
            });

            return true;
        }

        public async Task<bool> UpdateQuestionAsync(UpdateQuestionRequest request, int userId)
        {
            var subcategories = await _context.Categories.Where(x => x.UserId == userId && x.CategoryId == request.CategoryId)
                .Include(x => x.Subcategories)
                .ThenInclude(x => x.Questions)
                .ThenInclude(x => x.QuestionAnswers)
                .SelectMany(x => x.Subcategories)
                .ToListAsync();

            var question = subcategories.FirstOrDefault(x => x.SubcategoryId == request.SubcategoryId)?.Questions?
                .FirstOrDefault(x => x.QuestionId == request.QuestionId);

            if (question == null) { return false; }

            question.SubcategoryId = request.NewSubcategoryId;
            question.Description = request.NewDescription;
            question.Difficulty = request.NewDifficulty.ToString();
            foreach(var answer in question.QuestionAnswers)
            {
                answer.Description = request.QuestionAnswers.First(x => x.AnswerId == answer.AnswerId).Description;
                answer.IsCorrect = Convert.ToInt16(request.QuestionAnswers.First(x => x.AnswerId == answer.AnswerId).IsCorrect);
            }

            _context.Questions.Update(question);
            return true;
        }

        public async Task<List<QuestionDTO>> FetchQuestionsWithAnswersAsync(int userId, int testId)
        {
            var testQuestions = await _context.Tests.Where(x => x.ExaminerId == userId && x.TestId == testId)
                .Include(x => x.TestQuestions)
                .ThenInclude(x => x.Question)
                .ThenInclude(x => x.QuestionAnswers)
                .SelectMany(x => x.TestQuestions)
                .ToListAsync();

            var list = new List<QuestionDTO>();

            if (!testQuestions.Any())
                return list;

            foreach(var testQuestion in testQuestions)
            {
                var question = new QuestionDTO
                {
                    QuestionId = testQuestion.Question.QuestionId,
                    CategoryId = 0,
                    Difficulty = Enum.Parse<Difficulty>(testQuestion.Question.Difficulty),
                    Description = testQuestion.Question.Description,
                    SubcategoryId = testQuestion.Question.SubcategoryId,
                    QuestionAnswers = testQuestion.Question.QuestionAnswers.Select(y => new AnswerDTO
                    {
                        AnswerId = y.AnswerId,
                        QuestionId = y.QuestionId,
                        Description = y.Description,
                        IsCorrect = Convert.ToBoolean(y.IsCorrect)
                    }).ToList()
                };

                list.Add(question);
            }

            return list;
        }
    }
}
