using System;


namespace api.Models
{
    public class ADMINS
    {
        public int adminID { get; set; }
        public string adminName { get; set; }
        public string adminEmail { get; set; }
        public string adminPassword { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string BirthDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
    }
}
