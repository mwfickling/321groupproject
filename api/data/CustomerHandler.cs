using System;
using api.Models;
using MySql.Data.MySqlClient;

namespace _321groupproject.data
{
    public class CustomerHandler
    {
        private string server = "y5s2h87f6ur56vae.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
        private string database = "b4agsppojiq9rgc0";
        private string port = "3306";
        private string username = "qaiid1jjmowib061";
        private string password = "mbgqy5y6svil78sk";

        public void SaveCustomer(Customer value)
        {
            string cs = $"server={server};user={username};database={database};port={port};password={password}";
            using (var con = new MySqlConnection(cs))
            {
                con.Open();

                using (var cmd = new MySqlCommand(@"INSERT INTO CUSTOMERS(LastName, FirstName, userEmail, userPassword, Address, City, Region, PostalCode, Country, Phone, deleteUser, isAdmin) VALUES(@LastName, @FirstName, @userEmail, @userPassword, @Address, @City, @Region, @PostalCode, @Country, @Phone, @deleteUser, @isAdmin)", con))
                {
                    cmd.Parameters.AddWithValue("@LastName", value.LastName);
                    cmd.Parameters.AddWithValue("@FirstName", value.FirstName);
                    cmd.Parameters.AddWithValue("@userEmail", value.userEmail);
                    cmd.Parameters.AddWithValue("@userPassword", value.userPassword);
                    cmd.Parameters.AddWithValue("@Address", value.Address);
                    cmd.Parameters.AddWithValue("@City", value.City);
                    cmd.Parameters.AddWithValue("@Region", value.Region);
                    cmd.Parameters.AddWithValue("@PostalCode", value.PostalCode);
                    cmd.Parameters.AddWithValue("@Country", value.Country);
                    cmd.Parameters.AddWithValue("@Phone", value.Phone);
                    cmd.Parameters.AddWithValue("@deleteUser", value.deleteUser);
                    cmd.Parameters.AddWithValue("@isAdmin", value.isAdmin);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCustomer(int userID)
        {
            string cs = $"server={server};user={username};database={database};port={port};password={password}";
            using (var con = new MySqlConnection(cs))
            {
                con.Open();

                using (var cmd = new MySqlCommand("UPDATE CUSTOMERS SET deleteUser = @deleteUser WHERE userID = @userID", con))
                {
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@deleteUser", true);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateCustomer(Customer value)
        {
            string cs = $"server={server};user={username};database={database};port={port};password={password}";
            using (var con = new MySqlConnection(cs))
            {
                con.Open();

                using (var cmd = new MySqlCommand(@"UPDATE CUSTOMERS SET LastName = @LastName, FirstName = @FirstName, userEmail = @userEmail, userPassword = @userPassword, Address = @Address, City = @City, Region = @Region, PostalCode = @PostalCode, Country = @Country, Phone = @Phone, deleteUser = @deleteUser, isAdmin = @isAdmin WHERE userID = @userID", con))
                {
                    cmd.Parameters.AddWithValue("@LastName", value.LastName);
                    cmd.Parameters.AddWithValue("@FirstName", value.FirstName);
                    cmd.Parameters.AddWithValue("@userEmail", value.userEmail);
                    cmd.Parameters.AddWithValue("@userPassword", value.userPassword);
                    cmd.Parameters.AddWithValue("@Address", value.Address);
                    cmd.Parameters.AddWithValue("@City", value.City);
                    cmd.Parameters.AddWithValue("@Region", value.Region);
                    cmd.Parameters.AddWithValue("@PostalCode", value.PostalCode);
                    cmd.Parameters.AddWithValue("@Country", value.Country);
                    cmd.Parameters.AddWithValue("@Phone", value.Phone);
                    cmd.Parameters.AddWithValue("@deleteUser", value.deleteUser);
                    cmd.Parameters.AddWithValue("@isAdmin", value.isAdmin);
                    cmd.Parameters.AddWithValue("@userID", value.userID);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
