namespace Types.TestService
{
    public class AssignTestRequest
    {
        public int TestId { get; set; }
        public string[] UsersToAssign { get; set; }
    }
}
