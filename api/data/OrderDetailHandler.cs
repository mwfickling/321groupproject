using System;
using api.Models;
using MySql.Data.MySqlClient;

namespace _321groupproject.data
{
    public class OrderDetailHandler
    {
        private string server = "y5s2h87f6ur56vae.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
        private string database = "b4agsppojiq9rgc0";
        private string port = "3306";
        private string username = "qaiid1jjmowib061";
        private string password = "mbgqy5y6svil78sk";

        public void SaveOrderDetail(OrderDetail value)
        {
            string cs = $"server={server};user={username};database={database};port={port};password={password}";
            using (var con = new MySqlConnection(cs))
            {
                con.Open();

                using (var cmd = new MySqlCommand(@"INSERT INTO ORDERDETAILS (orderID, recipeID, qty, unitPrice) VALUES (@orderID, @recipeID, @qty, @unitPrice)", con))
                {
                    cmd.Parameters.AddWithValue("@orderID", value.orderID);
                    cmd.Parameters.AddWithValue("@recipeID", value.recipeID);
                    cmd.Parameters.AddWithValue("@qty", value.qty);
                    cmd.Parameters.AddWithValue("@unitPrice", value.unitPrice);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        // public void DeleteRecipe(int id)
        // {
        //     string cs = $"server={server};user={username};database={database};port={port};password={password}";
        //     using (var con = new MySqlConnection(cs))
        //     {
        //         con.Open();

        //         using (var cmd = new MySqlCommand("UPDATE RECIPES SET deleteRecipe = @deleteRecipe WHERE recipeID = @recipeID", con))
        //         {
        //             cmd.Parameters.AddWithValue("@recipeID", id);
        //             cmd.Parameters.AddWithValue("@deleteRecipe", true);
        //             cmd.ExecuteNonQuery();
        //         }
        //     }
        // }

        // public void UpdateRecipe(Recipe value)
        // {
        //     string cs = $"server={server};user={username};database={database};port={port};password={password}";
        //     using (var con = new MySqlConnection(cs))
        //     {
        //         con.Open();

        //         using (var cmd = new MySqlCommand(@"UPDATE RECIPES SET recipeName = @recipeName, cuisineType = @cuisineType, instructions = @instructions, numofServings = @numofServings, prepTime = @prepTime, cookTime = @cookTime, totalTime = @totalTime, recipeIMG = @recipeIMG, ingredientID = @ingredientID, deleteRecipe = @deleteRecipe WHERE recipeID = @recipeID", con))
        //         {
        //             cmd.Parameters.AddWithValue("@recipeName", value.recipeName);
        //             cmd.Parameters.AddWithValue("@cuisineType", value.cuisineType);
        //             cmd.Parameters.AddWithValue("@instructions", value.instructions);
        //             cmd.Parameters.AddWithValue("@numofServings", value.numofServings);
        //             cmd.Parameters.AddWithValue("@prepTime", value.prepTime);
        //             cmd.Parameters.AddWithValue("@cookTime", value.cookTime);
        //             cmd.Parameters.AddWithValue("@totalTime", value.totalTime);
        //             cmd.Parameters.AddWithValue("@recipeIMG", value.recipeIMG);
        //             cmd.Parameters.AddWithValue("@ingredientID", value.ingredientID);
        //             cmd.Parameters.AddWithValue("@deleteRecipe", value.deleteRecipe);
        //             cmd.Parameters.AddWithValue("@recipeID", value.id);
        //             cmd.ExecuteNonQuery();
        //         }
        //     }
        // }
    }
}
