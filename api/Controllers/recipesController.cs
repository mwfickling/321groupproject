using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using _321groupproject.data;

namespace api.Controllers
{
    [Route("api/Recipes")]
    [ApiController]
    public class RecipesController : ControllerBase
    {

        [HttpGet]
        public List<Recipe> Get() // new
        {
            return Recipe.getAllRecipes();
        }

        // GET: api/movies/{recipeID}
        [HttpGet("{recipeID}")]
        public ActionResult<Recipe> Get(int recipeID)
        {
            var recipe = Recipe.GetRecipeFromDatabaseById(recipeID);

            if (recipe == null)
            {
                return NotFound(); // Recipe not found
            }

            return recipe;
        }

        // POST: api/Books
        [HttpPost]
        public void Post([FromBody] Recipe value)
        {
            RecipeHandler dh = new RecipeHandler();
            dh.SaveRecipe(value);
        }

        // PUT: api/Books/5
        [HttpPut("{recipeID}")]
        public void Put([FromBody] Recipe value)
        {
            RecipeHandler dh = new RecipeHandler();
            dh.UpdateRecipe(value);
        }

        // DELETE: api/Books/5
        [HttpDelete("{recipeID}")]
        public void Delete(int recipeID)
        {
            RecipeHandler dh = new RecipeHandler();
            dh.DeleteRecipe(recipeID);
        }
    }
}
