namespace AuthAPI.Domain
{
    public class UserProfile
    {
        public int Id { get; set; } // Primary Key
        public string Email { get; set; } // Link to AspNetUsers via Email
        public string PrimaryMobileNumber { get; set; }
        public string SecondaryMobileNumber { get; set; }
        public string HomeAddress { get; set; }
        public string OfficeAddress { get; set; }
        public string SecondaryEmail { get; set; }
        public string AdditionalInfo { get; set; }
    }

}
