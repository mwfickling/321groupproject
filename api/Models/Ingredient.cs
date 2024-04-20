using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using api.data;
using System.Data;

namespace api.Models
{
    public class Ingredient
    {
        public int ingredientID { get; set; }
        public int recipeID { get; set; }
        public string ingredientName { get; set; }
        public string ingredientDescription { get; set; }
        public decimal unitPrice { get; set; }
        public string ingredientIMG { get; set; }


        public static List<Ingredient> GetAllIngredients()
        {
            List<Ingredient> ingredients = new List<Ingredient>();

            try
            {
                Database database = new Database();

                using (var con = database.GetPublicConnection())
                {
                    string query = "SELECT * FROM INGREDIENTS";
                    MySqlCommand cmd = new MySqlCommand(query, con);

                    using (MySqlDataReader rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            ingredients.Add(new Ingredient
                            {
                                ingredientID = rdr.GetInt32("ingredientID"),
                                recipeID = rdr.GetInt32("recipeID"),
                                ingredientName = rdr.GetString("ingredientName"),
                                ingredientDescription = rdr.GetString("ingredientDescripiton"),
                                unitPrice = rdr.GetDecimal("unitPrice"),
                                ingredientIMG = rdr.GetString("ingredientIMG")
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching ingredients: " + ex.Message);
            }

            return ingredients;
        }
        public static List<Ingredient> GetIngredientsByRecipeID(int recipeID)
        {
            List<Ingredient> ingredients = new List<Ingredient>();
            Database database = new Database();

            using (var con = database.GetPublicConnection())
            {
                string query = "SELECT * FROM INGREDIENTS WHERE recipeID = @recipeID";
                MySqlCommand cmd = new MySqlCommand(query, con);
                cmd.Parameters.AddWithValue("@recipeID", recipeID);

                using (MySqlDataReader rdr = cmd.ExecuteReader())
                {
                    while (rdr.Read())
                    {
                        ingredients.Add(new Ingredient
                        {
                            ingredientID = rdr.GetInt32(0),
                            recipeID = rdr.GetInt32(1),
                            ingredientName = rdr.GetString(2),
                            ingredientDescription = rdr.GetString(3),
                            unitPrice = rdr.GetDecimal(4),
                            ingredientIMG = rdr.GetString(5)
                        });
                    }
                }
            }

            return ingredients;
        }
    }
}
