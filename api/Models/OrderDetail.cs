using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using api.data;
using System.Data;

namespace api.Models
{
    public class OrderDetail
    {
        public int orderID { get; set; }
        public int recipeID { get; set; }
        public int qty { get; set; }

        public decimal unitPrice { get; set; }


        public static List<OrderDetail> GetOrderDetailsbyId(int orderID)
        {
            List<OrderDetail> orderDetails = new List<OrderDetail>();
            Database database = new Database();

            using (var con = database.GetPublicConnection())
            {
                string query = "SELECT * FROM ORDERDETAILS WHERE orderID = @orderID";
                MySqlCommand cmd = new MySqlCommand(query, con);
                cmd.Parameters.AddWithValue("@orderID", orderID);

                using (MySqlDataReader rdr = cmd.ExecuteReader())
                {
                    while (rdr.Read())
                    {
                        orderDetails.Add(new OrderDetail
                        {
                            orderID = rdr.GetInt32(0),
                            recipeID = rdr.GetInt32(1),
                            qty = rdr.GetInt32(2),
                            unitPrice = rdr.GetDecimal(3)
                        });
                    }
                }
            }

            return orderDetails;
        }
        public static List<OrderDetail> GetAllOrderDetails()
        {
            List<OrderDetail> orderDetails = new List<OrderDetail>();

            Database database = new Database();
            using (var con = database.GetPublicConnection())
            {
                string query = "SELECT * FROM ORDERDETAILS";
                MySqlCommand cmd = new MySqlCommand(query, con);
                using (MySqlDataReader rdr = cmd.ExecuteReader())
                {
                    while (rdr.Read())
                    {
                        OrderDetail orderDetail = new OrderDetail
                        {
                            orderID = rdr.GetInt32("orderID"),
                            recipeID = rdr.GetInt32("recipeID"),
                            qty = rdr.GetInt32("qty"),
                            unitPrice = rdr.GetDecimal("unitPrice")
                        };
                        orderDetails.Add(orderDetail);
                    }
                }
            }

            return orderDetails;
        }
    }
}