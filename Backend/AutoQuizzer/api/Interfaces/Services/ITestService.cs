﻿using Types.DTOs;
using Types.TestService;

namespace Interfaces.Services
{
    public interface ITestService
    {
        Task<bool> CreateTestAsync(CreateTestRequest request, int userId);
        Task<bool> AssignTestAsync(AssignTestRequest request, int userId);
        Task<List<TestDTO>> FetchTestsAsync(int userId, string difficulty);
    }
}