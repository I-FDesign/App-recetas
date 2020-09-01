let recipe;
let recipeCreated = false;
let ingredient = new Ingredient();

let validatedScreens = [];


function recipeUnityChanged(event) {
    const unityChoosed = event.target.value;

    if(!unityChoosed) {
        return;
    }

    const unitySelected = ingredient.unitys.find((unityObject) => {
        return unityObject.principalUnity.unity === unityChoosed;
    })

    $('#cost_type').html('1 ' + unitySelected.principalUnity.name);
    $('#needed_quantity').html(unitySelected.secondaryUnity.name);

    ingredient.unity = unitySelected;
    
}

function showErrorMessage(message, screenId) {

    if(validatedScreens.indexOf(screenId) >= 0) {
        validatedScreens.splice(validatedScreens.indexOf(screenId), 1);
    }

    $('.bottom .alert-message').css({
        display: 'block'
    })

    $('#alert_message').html(message);
}

function createRecipe() {
    let ingredients = (recipeCreated) ? recipe.ingredients : [];
    recipe = new Recipe(
        $('#recipeName').val(),
        $('#contactEmail').val(),
        ingredients,
        0
    );

    recipeCreated = true;
}

function validateIngredient() {
    if($('#ingredientName').val().length === 0) {
        showErrorMessage('Debes ingresar un nombre para el ingrediente', 2);
        return false;
    }

    if($('#ingredientUnity').val().length === 0) {
        showErrorMessage('Debes ingresar una unidad para el ingrediente', 2);
        return false;
    }

    if($('#ingredientQuantity').val().length === 0) {
        showErrorMessage('Debes ingresar una cantidad para el ingrediente', 2);
        return false;
    } else if(isNaN($('#ingredientQuantity').val())) {
        showErrorMessage('La cantidad debe ser numerica (Ej: 250 o 200.86)', 2);
        return false;
    }

    if($('#ingredientPrice').val().length === 0) {
        showErrorMessage('Debes ingresar un costo para el ingrediente', 2);
        return false;
    } else if(isNaN($('#ingredientPrice').val())) {
        showErrorMessage('El costo debe ser numerico (Ej: 245 o 154.56)', 2);
        return false;
    }

    return true;
}

function validateScreen(screenId) {
    switch(screenId){
        case 1:
            if($('#recipeName').val().length > 0) {
                if($('#contactEmail').val().length > 0) {
                    if(validatedScreens.indexOf(screenId) < 0) {
                        validatedScreens.push(screenId);
                        $('.bottom .alert-message').css({
                            display: 'none'
                        })
                    }

                    createRecipe();
                } else {
                    showErrorMessage('Debes ingresar un email de contacto', screenId);
                }
            } else {
                showErrorMessage('Debes ingresar un nombre para la receta', screenId);
            }
            break;
        case 2:

            if(recipe.ingredients.length <= 0) {
                showErrorMessage('Debes agregar al menos un ingrediente', 2);
                break;
            }

            if(validatedScreens.indexOf(screenId) < 0) {
                validatedScreens.push(screenId);
                $('.bottom .alert-message').css({
                    display: 'none'
                })
            }

            break;
        case 3:
            const inputs = $('#screen_3 input');
            
            for (let i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                
                if($(input).val().length <= 0 || isNaN($(input).val()) ) {
                    showErrorMessage('Debes ingresar un valor valido en: ' + $(input).data('name'), 3);
                    return;
                } else {
                    recipe[$(input).attr('id')] = parseFloat($(input).val());
                }
            }

            if(validatedScreens.indexOf(screenId) < 0) {
                validatedScreens.push(screenId);
                $('.bottom .alert-message').css({
                    display: 'none'
                })
            }

            generateTable();
                
            break;

        case 4:
            $('#cost_type').html('1 metro');
            break;
    }   
}

function addIngredient() {
    if(!validateIngredient()) {
        return;
    }

    $('.bottom .alert-message').css({
        display: 'none'
    })

    ingredient.name = $('#ingredientName').val();
    ingredient.quantity = $('#ingredientQuantity').val();
    ingredient.price = $('#ingredientPrice').val();

    recipe.ingredients.push(ingredient);

    const ingredientIndex = recipe.ingredients.length - 1;

    const listElement = 
    "<li class=\'list-group-item d-flex justify-content-between align-items-center\' id='ingredient_" + ingredientIndex +"'>" +
        (ingredientIndex + 1) + '- ' + ingredient.name + ' - ' + ingredient.quantity + ' - $' + ingredient.price +
        "<span onclick=\"removeIngredient('" + ingredientIndex +"')\"class=\'badge badge-primary badge-pill\' style='cursor: pointer;'>" +
            "<i class=\'fa fa-close\'></i>" +
        "</span>" +
    "</li>";

    $('.ingredients-list').css({
        display: 'block'
    });

    const oldHtml = $('#ingredients_list').html();
    $('#ingredients_list').html(oldHtml + listElement);
    
    //Reset ingredients form
    $('.second input, .second select').val("");

    adjustScreen(actualScreen);
    ingredient = new Ingredient();
}

function removeIngredient(ingredientId) {
    recipe.ingredients.splice(ingredientId, 1);

    $('#ingredient_' + ingredientId).remove();

    if(recipe.ingredients.length <= 0) {
        $('.ingredients-list').css({
            display: 'none'
        });
    }

    adjustScreen(actualScreen);
}

function generateTable() {
    $('#recipe_name_placeholder').html(recipe.name);

    $('.next-screen').css({
        display: 'none'
    })

    $('.print-button').css({
        display: 'block'
    })

    const tableBody = $('#recipe_table tbody');

    recipe.ingredients.forEach(ingredient => {

        let ingredientCost = (ingredient.price * ingredient.quantity);
        ingredientCost = ingredientCost / ingredient.unity.secondaryUnity.equivalency;
        ingredientCost = ingredientCost.toFixed(2);

        const tr = 
        "<tr>" +
            "<th scope='row'>" + ingredient.name + "</th>" +
            "<td>" + ingredient.quantity + " " + ingredient.unity.secondaryUnity.name + "</td>" +
            "<td>$"+ ingredient.price +"</td>" +
            "<td>$"+ ingredientCost +"</td>" +
        "</tr>";

        tableBody.html(tableBody.html() + tr);
    });
   
    console.log(recipe);
}