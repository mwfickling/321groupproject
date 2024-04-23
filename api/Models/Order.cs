using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using api.data;
using System.Data;

namespace api.Models
{
    public class Order
    {
        public int orderID { get; set; }
        public int userID { get; set; }
        public string orderDate { get; set; }
        public string shippedDate { get; set; }

        public static Order GetOrderById(int id)
        {
            Order order = null;
            Database database = new Database();

            using (var con = database.GetPublicConnection())
            {
                string query = "SELECT * FROM ORDERS WHERE orderID = @id";
                MySqlCommand cmd = new MySqlCommand(query, con);
                cmd.Parameters.AddWithValue("@id", id);

                using (MySqlDataReader rdr = cmd.ExecuteReader())
                {
                    if (rdr.Read())
                    {
                        order = new Order
                        {
                            orderID = rdr.GetInt32(0),
                            userID = rdr.GetInt32(1),
                            orderDate = rdr.GetString(2),
                            shippedDate = rdr.GetString(3)
                        };
                    }
                }
            }

            return order;
        }
        public static List<Order> GetAllOrders()
        {
            List<Order> orders = new List<Order>();

            Database database = new Database();
            using (var con = database.GetPublicConnection())
            {
                string query = "SELECT * FROM ORDERS";
                MySqlCommand cmd = new MySqlCommand(query, con);
                using (MySqlDataReader rdr = cmd.ExecuteReader())
                {
                    while (rdr.Read())
                    {
                        Order order = new Order
                        {
                            orderID = rdr.GetInt32("orderID"),
                            userID = rdr.GetInt32("userID"),
                            orderDate = rdr.GetString("orderDate"),
                            shippedDate = rdr.GetString("shippedDate")
                        };
                        orders.Add(order);
                    }
                }
            }

            return orders;
        }

        public static List<Order> GetOrdersByUserId(int userId)
        {
            List<Order> orders = new List<Order>();
            Database database = new Database();

            using (var con = database.GetPublicConnection())
            {
                string query = "SELECT * FROM ORDERS WHERE userID = @userId";
                MySqlCommand cmd = new MySqlCommand(query, con);
                cmd.Parameters.AddWithValue("@userId", userId);

                using (MySqlDataReader rdr = cmd.ExecuteReader())
                {
                    while (rdr.Read())
                    {
                        Order order = new Order
                        {
                            orderID = rdr.GetInt32(0),
                            userID = rdr.GetInt32(1),
                            orderDate = rdr.GetString(2),
                            shippedDate = rdr.GetString(3)
                        };
                        orders.Add(order);
                    }
                }
            }

            return orders;
        }


    }
}