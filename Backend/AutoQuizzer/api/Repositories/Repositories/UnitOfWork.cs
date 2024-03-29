﻿using Interfaces.Repositories;
using Types.DatabaseContext;

namespace Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AutoQuizzerContext _context;
        public IUserRepository UserRepository => new UserRepository(_context);
        public ICategoryRepository CategoryRepository => new CategoryRepository(_context);
        public ISubcategoryRepository SubcategoryRepository => new SubcategoryRepository(_context);
        public IQuestionRepository QuestionRepository => new QuestionRepository(_context);
        public ITestRepository TestRepository => new TestRepository(_context);

        public UnitOfWork(AutoQuizzerContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}