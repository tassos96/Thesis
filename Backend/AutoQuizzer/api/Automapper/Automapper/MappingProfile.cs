using AutoMapper;
using Types.DatabaseContext;
using Types.DTOs;

namespace Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDTO>();
            CreateMap<Assignment, AssignmentDTO>();
            CreateMap<UsersRepository, RepositoryDTO>();
            //CreateMap<Category, CategoryDTO>();
            //CreateMap<SubCategory, SubCategoryDTO>();
            //CreateMap<Order, OrderDTO>().ReverseMap();
            //CreateMap<Address, AddressDTO>();
            //CreateMap<PaymentMethod, PaymentMethodDTO>();
            //CreateMap<DeliveryMethod, DeliveryMethodDTO>();
            //CreateMap<DeliveryPolicy, DeliveryPolicyDTO>();
        }
    }
}
