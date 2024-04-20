using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using api.data;
using System.Data;

namespace api.Models
{
    public class Recipe
    {
        public int id { get; set; }
        public string recipeName { get; set; }
        public string cuisineType { get; set; }
        public string instructions { get; set; }
        public int numofServings { get; set; }
        public string prepTime { get; set; }
        public string cookTime { get; set; }
        public string totalTime { get; set; }
        public string recipeIMG { get; set; }
        public int ingredientID { get; set; }
        public bool deleteRecipe { get; set; }

        public static Recipe GetRandomRecipeFromDatabase()
        {
            Recipe randomRecipe = null;
            Database database = new Database();

            using (var con = database.GetPublicConnection())
            {
                string query = "SELECT * FROM RECIPES ORDER BY RAND() LIMIT 1";
                MySqlCommand cmd = new MySqlCommand(query, con);

                using (MySqlDataReader rdr = cmd.ExecuteReader())
                {
                    if (rdr.Read())
                    {
                        randomRecipe = new Recipe
                        {
                            id = rdr.GetInt32(0),
                            recipeName = rdr.GetString(1),
                            cuisineType = rdr.GetString(2),
                            instructions = rdr.GetString(3),
                            numofServings = rdr.GetInt32(4),
                            prepTime = rdr.GetString(5),
                            cookTime = rdr.GetString(6),
                            totalTime = rdr.GetString(7),
                            recipeIMG = rdr.GetString(8),
                            ingredientID = rdr.GetInt32(9),
                            deleteRecipe = rdr.GetBoolean(10)
                        };
                    }
                }
            }

            return randomRecipe;
        }

        public static Recipe GetRecipeFromDatabaseById(int id)
        {
            Recipe recipe = null;
            Database database = new Database();

            using (var con = database.GetPublicConnection())
            {
                string query = "SELECT * FROM RECIPES WHERE recipeID = @id";
                MySqlCommand cmd = new MySqlCommand(query, con);
                cmd.Parameters.AddWithValue("@id", id);

                using (MySqlDataReader rdr = cmd.ExecuteReader())
                {
                    if (rdr.Read())
                    {
                        recipe = new Recipe
                        {
                            id = rdr.GetInt32(0),
                            recipeName = rdr.GetString(1),
                            cuisineType = rdr.GetString(2),
                            instructions = rdr.GetString(3),
                            numofServings = rdr.GetInt32(4),
                            prepTime = rdr.GetString(5),
                            cookTime = rdr.GetString(6),
                            totalTime = rdr.GetString(7),
                            recipeIMG = rdr.GetString(8),
                            ingredientID = rdr.GetInt32(9),
                            deleteRecipe = rdr.GetBoolean(10)
                        };
                    }
                }
            }

            return recipe;
        }
        public static List<Recipe> getAllRecipes()
        {
            List<Recipe> myRecipes = new List<Recipe>();
            Database database = new Database();
            using (var con = database.GetPublicConnection())
            {
                string stm = "SELECT * FROM RECIPES";
                MySqlCommand cmd = new MySqlCommand(stm, con);
                using MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    myRecipes.Add(new Recipe()
                    {
                        id = rdr.GetInt32(0),
                        recipeName = rdr.GetString(1),
                        cuisineType = rdr.GetString(2),
                        instructions = rdr.GetString(3),
                        numofServings = rdr.GetInt32(4),
                        prepTime = rdr.GetString(5),
                        cookTime = rdr.GetString(6),
                        totalTime = rdr.GetString(7),
                        recipeIMG = rdr.GetString(8),
                        ingredientID = rdr.GetInt32(9),
                        deleteRecipe = rdr.GetBoolean(10)
                    });
                }
            }
            return myRecipes;
        }
    }
}
