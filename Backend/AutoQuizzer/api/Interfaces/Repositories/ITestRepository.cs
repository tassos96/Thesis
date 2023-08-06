﻿using Types.DatabaseContext;
using Types.DTOs;
using Types.TestService;

namespace Interfaces.Repositories
{
    public interface ITestRepository
    {
        Task<bool> CreateTestAsync(CreateTestRequest request, int userId);

        Task<bool> AssignTestAsync(string[] usersToAssing, Test test);
        Task<bool> AssignTestAsync(AssignTestRequest request, int userId);
        Task<List<TestDTO>> FetchTestsAsync(int userId, string difficulty);
    }
}