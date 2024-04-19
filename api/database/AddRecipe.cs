using MySQL.Data.MySqlClient;
using api.Model;

namespace api.Database{
    public class AddRecipe{
        public void AddARecipe(Recipe newRecipe){
            Database myConnection = new Database();

            using var con = myConnection.GetPublicConnection();
            con.Open();

            //Insert the new recipe into the table
            string stm = @"insert into recipes(recipeID, recipeName, cuisineType, instructions, numofServings, prepTime, cookTime, totalTime, recipeIMG, ingredientID) values(@recipeID, @recipeName, @cuisineType, @instructions, @numofServings, @prepTime, @cookTime, @totalTime, @recipeIMG, @ingredientID);";

            using var cmd =  new MySqlCommand(stm, con);

            //Parameters
            cmd.Parameters.AddWithValue("@recipeID", newRecipe.recipeID);
            cmd.Parameters.AddWithValue("@recipeName", newRecipe.recipeName);
            cmd.Parameters.AddWithValue("@cuisineType", newRecipe.cuisineType);
            cmd.Parameters.AddWithValue("@instructions", newRecipe.instructions);
            cmd.Parameters.AddWithValue("@numofServings", newRecipe.numofServings);
            cmd.Parameters.AddWithValue("@prepTime", newRecipe.prepTime);
            cmd.Parameters.AddWithValue("@cookTime", newRecipe.cookTime);
            cmd.Parameters.AddWithValue("@totalTime", newRecipe.totalTime);
            cmd.Parameters.AddWithValue("@recipeIMG", newRecipe.recipeIMG);
            cmd.Parameters.AddWithValue("@ingredientID", newRecipe.ingredientID);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}