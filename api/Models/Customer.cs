using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using api.data;
using System.Data;

namespace api.Models
{
    public class Customer
    {
        public int userID { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string userEmail { get; set; }
        public string userPassword { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public bool deleteUser { get; set; }
        public bool isAdmin { get; set; }

        public static Customer GetCustomerById(int userID)
        {
            Customer customer = null;
            Database database = new Database();

            using (var con = database.GetPublicConnection())
            {
                string query = "SELECT * FROM CUSTOMERS WHERE userID = @userID";
                MySqlCommand cmd = new MySqlCommand(query, con);
                cmd.Parameters.AddWithValue("@userID", userID);

                using (MySqlDataReader rdr = cmd.ExecuteReader())
                {
                    if (rdr.Read())
                    {
                        customer = new Customer
                        {
                            userID = rdr.GetInt32(0),
                            LastName = rdr.GetString(1),
                            FirstName = rdr.GetString(2),
                            userEmail = rdr.GetString(3),
                            userPassword = rdr.GetString(4),
                            Address = rdr.GetString(5),
                            City = rdr.GetString(6),
                            Region = rdr.GetString(7),
                            PostalCode = rdr.GetString(8),
                            Country = rdr.GetString(9),
                            Phone = rdr.GetString(10),
                            deleteUser = rdr.GetBoolean(11),
                            isAdmin = rdr.GetBoolean(12)
                        };
                    }
                }
            }

            return customer;
        }

        public static Customer GetCustomerByEmail(string userEmail)
        {
            Customer customer = null;
            Database database = new Database();

            using (var con = database.GetPublicConnection())
            {
                string query = "SELECT * FROM CUSTOMERS WHERE userEmail = @userEmail";
                MySqlCommand cmd = new MySqlCommand(query, con);
                cmd.Parameters.AddWithValue("@userEmail", userEmail);

                using (MySqlDataReader rdr = cmd.ExecuteReader())
                {
                    if (rdr.Read())
                    {
                        customer = new Customer
                        {
                            userID = rdr.GetInt32(0),
                            LastName = rdr.GetString(1),
                            FirstName = rdr.GetString(2),
                            userEmail = rdr.GetString(3),
                            userPassword = rdr.GetString(4),
                            Address = rdr.GetString(5),
                            City = rdr.GetString(6),
                            Region = rdr.GetString(7),
                            PostalCode = rdr.GetString(8),
                            Country = rdr.GetString(9),
                            Phone = rdr.GetString(10),
                            deleteUser = rdr.GetBoolean(11),
                            isAdmin = rdr.GetBoolean(12)
                        };
                    }
                }
            }

            return customer;
        }

        public static List<Customer> GetAllCustomers()
        {
            List<Customer> customers = new List<Customer>();
            Database database = new Database();
            using (var con = database.GetPublicConnection())
            {
                string stm = "SELECT * FROM CUSTOMERS";
                MySqlCommand cmd = new MySqlCommand(stm, con);
                using MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    customers.Add(new Customer()
                    {
                        userID = rdr.GetInt32(0),
                        LastName = rdr.GetString(1),
                        FirstName = rdr.GetString(2),
                        userEmail = rdr.GetString(3),
                        userPassword = rdr.GetString(4),
                        Address = rdr.GetString(5),
                        City = rdr.GetString(6),
                        Region = rdr.GetString(7),
                        PostalCode = rdr.GetString(8),
                        Country = rdr.GetString(9),
                        Phone = rdr.GetString(10),
                        deleteUser = rdr.GetBoolean(11),
                        isAdmin = rdr.GetBoolean(12)
                    });
                }
            }
            return customers;
        }
    }
}