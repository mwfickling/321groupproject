using System;


namespace api.Models
{
    public class RECIPES
    {
        public int recipeID { get; set; }
        public string recipeName { get; set; }
        public string cuisineType { get; set; }
        public int numofServings { get; set; }
        public string prepTime { get; set; }
        public string cookTime { get; set; }
        public string totalTime { get; set; }
        public string recipeIMG { get; set; }
        public int ingredientID { get; set; }
        public bool deleteRecipe { get; set; }
    }
}