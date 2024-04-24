using System;
using api.Models;
using MySql.Data.MySqlClient;

namespace _321groupproject.data
{
    public class IngredientHandler
    {
        private string server = "y5s2h87f6ur56vae.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
        private string database = "b4agsppojiq9rgc0";
        private string port = "3306";
        private string username = "qaiid1jjmowib061";
        private string password = "mbgqy5y6svil78sk";

        public void SaveIngredient(Ingredient value)
        {
            string cs = $"server={server};user={username};database={database};port={port};password={password}";
            using (var con = new MySqlConnection(cs))
            {
                con.Open();

                using (var cmd = new MySqlCommand(@"INSERT INTO INGREDIENTS(recipeID, ingredientName, ingredientDescripiton, unitPrice, ingredientIMG) VALUES(@recipeID, @ingredientName, @ingredientDescripiton, @unitPrice, @ingredientIMG)", con))
                {
                    cmd.Parameters.AddWithValue("@recipeID", value.recipeID);
                    cmd.Parameters.AddWithValue("@ingredientName", value.ingredientName);
                    cmd.Parameters.AddWithValue("@ingredientDescripiton", value.ingredientDescripiton);
                    cmd.Parameters.AddWithValue("@unitPrice", value.unitPrice);
                    cmd.Parameters.AddWithValue("@ingredientIMG", value.ingredientIMG);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteIngredient(int ingredientID)
        {
            string cs = $"server={server};user={username};database={database};port={port};password={password}";
            using (var con = new MySqlConnection(cs))
            {
                con.Open();

                using (var cmd = new MySqlCommand("DELETE FROM INGREDIENTS WHERE ingredientID = @ingredientID", con))
                {
                    cmd.Parameters.AddWithValue("@ingredientID", ingredientID);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateIngredient(Ingredient value)
        {
            string cs = $"server={server};user={username};database={database};port={port};password={password}";
            using (var con = new MySqlConnection(cs))
            {
                con.Open();

                using (var cmd = new MySqlCommand(@"UPDATE INGREDIENTS SET recipeID = @recipeID, ingredientName = @ingredientName, ingredientDescripiton = @ingredientDescripiton, unitPrice = @unitPrice, ingredientIMG = @ingredientIMG WHERE ingredientID = @ingredientID", con))
                {
                    cmd.Parameters.AddWithValue("@recipeID", value.recipeID);
                    cmd.Parameters.AddWithValue("@ingredientName", value.ingredientName);
                    cmd.Parameters.AddWithValue("@ingredientDescripiton", value.ingredientDescripiton);
                    cmd.Parameters.AddWithValue("@unitPrice", value.unitPrice);
                    cmd.Parameters.AddWithValue("@ingredientIMG", value.ingredientIMG);
                    cmd.Parameters.AddWithValue("@ingredientID", value.ingredientID);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
