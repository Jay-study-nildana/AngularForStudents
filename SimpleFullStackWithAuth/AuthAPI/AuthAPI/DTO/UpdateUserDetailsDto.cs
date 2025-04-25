namespace AuthAPI.DTO
{
    public class UpdateUserDetailsDto
    {
        public string PrimaryMobileNumber { get; set; }
        public string SecondaryMobileNumber { get; set; }
        public string HomeAddress { get; set; }
        public string OfficeAddress { get; set; }
        public string SecondaryEmail { get; set; }
        public string AdditionalInfo { get; set; }
    }

}
