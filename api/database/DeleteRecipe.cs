using MySQL.Data.MySqlClient;
using api.Model;

namespace api.Database{
    public class DeleteRecipe{
        public void DeleteAMovie(int id){
            Database myConnection = new Database();

            using var con = myConnection.GetPublicConnection();
            con.Open();

            // Delete movie with matching id from the table
            // update and set delete in table to true 
            string stm = @"update recipes set deleteRecipe = true where recipeID=@recipeID;";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@recipeID", id);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}