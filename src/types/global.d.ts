interface INutrient {
  name: string;
  amount: number;
  unit: string;
}

interface IRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  nutrition?: {
    nutrients: INutrient[];
  };
}

interface IRecipeDetails extends IRecipe {
  ingredients: string[];
  summary: string;
  instructions: string;
}

interface ResponseInfo {
  offset: number;
  number: number;
  totalResults: number;
}

interface ApiResponse extends ResponseInfo {
  results: IRecipe[];
}
