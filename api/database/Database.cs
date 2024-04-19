using MySql.Data.MySqlClient;

namespace API.Database{
    public class Database{
        private string server = "y5s2h87f6ur56vae.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	";
        private string database = "b4agsppojiq9rgc0	";
        private string port = "3306";
        private string username = "qaiid1jjmowib061";
        private string password = "mbgqy5y6svil78sk";

        public MySqlConnection GetPublicConnection(){
            string cs = $"server={server};user={username};database={database};port={port};password={password};";
            var con = new MySqlConnection(cs);
            return con;
        }
    }
}