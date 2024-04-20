namespace api.model
{
    public class Customer
    {
        public int userId {get ; set; }
        public string lastName {get; set; }
        public string firsName {get; set; }
        public string userEmail {get; set; }
        public string userPassword {get; set; }
        public string address {get; set; }
        public string city {get; set; }
        public string region {get; set; }
        public string postalCode {get; set; }
        public string country {get; set; }
        public string phone {get; set; }
        public bool deleteUser {get; set; }
    }
}