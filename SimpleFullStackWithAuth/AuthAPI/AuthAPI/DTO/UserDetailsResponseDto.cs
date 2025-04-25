namespace AuthAPI.DTO
{
    public class UserDetailsResponseDto
    {
        public UserProfileDto UserProfile { get; set; }
        public List<ClaimDto> Claims { get; set; }
    }

    public class ClaimDto
    {
        public string Type { get; set; }
        public string Value { get; set; }
    }

    public class UserProfileDto
    {
        public string Email { get; set; }
        public string PrimaryMobileNumber { get; set; }
        public string SecondaryMobileNumber { get; set; }
        public string HomeAddress { get; set; }
        public string OfficeAddress { get; set; }
        public string SecondaryEmail { get; set; }
        public string AdditionalInfo { get; set; }
    }
}
