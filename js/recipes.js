let recipe;
let recipeCreated = false;
let ingredient = new Ingredient();

let tableAlreadyGenerated = true;


function recipeUnityChanged(event) {
    const unityChoosed = event.target.value;

    if(!unityChoosed) {
        $(event.target).val(ingredient.unity);
        return;
    }

    const unitySelected = ingredient.unitys.find((unityObject) => {
        return unityObject.principalUnity.unity === unityChoosed;
    })

    $('.needed-quantity').html(unitySelected.secondaryUnity.name);

    $('.unity-equivalency').html(
        '1 <strong>' + unitySelected.principalUnity.unity.toUpperCase() + '</strong>' +
        ' equivale a ' + unitySelected.secondaryUnity.equivalency + ' ' 
        + '<strong>' + unitySelected.secondaryUnity.name.toUpperCase() + '</strong>'
    );

    ingredient.unity = unitySelected;
    
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

    if($('#ingredientBuyQuantity').val().length === 0) {
        showErrorMessage('Debes ingresar una cantidad para la compra el ingrediente', 2);
        return false;
    } else if(isNaN($('#ingredientBuyQuantity').val())) {
        showErrorMessage('La cantidad de la compra debe ser numerica (Ej: 245 o 124.36)', 2);
        return false;
    }

    if($('#ingredientPrice').val().length === 0) {
        showErrorMessage('Debes ingresar un costo para el ingrediente', 2);
        return false;
    } else if(isNaN($('#ingredientPrice').val())) {
        showErrorMessage('El costo debe ser numerico (Ej: 245 o 154.56)', 2);
        return false;
    }

    if($('#ingredientQuantity').val().length === 0) {
        showErrorMessage('Debes ingresar una cantidad para el ingrediente', 2);
        return false;
    } else if(isNaN($('#ingredientQuantity').val())) {
        showErrorMessage('La cantidad debe ser numerica (Ej: 250 o 200.86)', 2);
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
                    saveUserEmail($('#contactEmail').val());
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

            const utilidad = parseFloat($('#utilidad').val());

            if(utilidad < 8 || utilidad > 65) {
                showErrorMessage('El campo utilidad debe estar entre 8 y 65', 3);
                break;
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
    ingredient.buyQuantity = $('#ingredientBuyQuantity').val();
    ingredient.price = $('#ingredientPrice').val();
    ingredient.quantity = $('#ingredientQuantity').val();

    recipe.ingredients.push(ingredient);

    const ingredientIndex = recipe.ingredients.length - 1;

    const listElement = 
    "<li class=\'list-group-item d-flex justify-content-between align-items-center\' id='ingredient_" + ingredientIndex +"'>" +
        (ingredientIndex + 1) + '- ' + ingredient.name + ' - ' + ingredient.quantity + ' - $' + ingredient.price +
        "<div class='option-buttons'>" +
            "<span onclick=\"editIngredient('" + ingredientIndex +"')\"class='badge badge-primary badge-pill' style='cursor: pointer;'>" +
                "<i class='fa fa-pencil'></i>" +
            "</span>" +
            "<span onclick=\"removeIngredient('" + ingredientIndex +"')\"class='badge badge-danger badge-pill ml-2' style='cursor: pointer;'>" +
                "<i class='fa fa-trash' style='font-size: 13px;'></i>" +
            "</span>" +
        "</div>" +
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

function editIngredient(ingredientId) {
    const ingredientToEdit = recipe.ingredients[ingredientId];

    $('#ingredientName').val(ingredientToEdit.name);
    $('#ingredientBuyQuantity').val(ingredientToEdit.buyQuantity);
    $('#ingredientPrice').val(ingredientToEdit.price);
    $('#ingredientQuantity').val(ingredientToEdit.quantity);

    removeIngredient(ingredientId);
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

function calculatePercentaje(value, percentaje) {
    let response, percentajeToCalc = 0;

    if(percentaje > 100) {
        percentajeToCalc = (percentaje / 100);
    } else {
        percentajeToCalc = 1 + (percentaje / 100);
    }
    
    response = value * percentajeToCalc;

    return response;
}

function generateTable() {
    $('#recipe_name_placeholder').html(recipe.name);

    $('.next-screen, .next-screen button').css({
        display: 'none'
    })

    $('#final-buttons').removeClass('d-none');
    $('#final-buttons').css({
        display: 'block'
    })

    const tableBody = $('#recipe_table tbody');
    let total = 0;

    recipe.ingredients.forEach(ingredient => {

        let ingredientCost = (ingredient.price * ingredient.quantity);
        ingredientCost = ingredientCost / ingredient.buyQuantity;
        ingredientCost = ingredientCost.toFixed(3);

        total += parseFloat(ingredientCost);

        const tr = 
        "<tr>" +
            "<th scope='row'>" + ingredient.name + "</th>" +
            "<td>" + ingredient.quantity + " " + ingredient.unity.secondaryUnity.name + "</td>" +
            "<td>$"+ ingredient.price +"</td>" +
            "<td>$"+ ingredientCost +"</td>" +
        "</tr>";

        tableBody.html(tableBody.html() + tr);
    });

    total = total.toFixed(3);

    $('#carga_fabril_choosed').html(recipe.cargaFabril);
    $('#amortizacion_choosed').html(recipe.amortizacion);
    $('#utilidad_choosed').html(recipe.utilidad);
    $('#iva_choosed').html(recipe.iva);
    $('#porciones_choosed').html(recipe.porciones);

    const calcs = {
        cargaFabril: parseFloat(calculatePercentaje(total, recipe.cargaFabril).toFixed(3)),
    }

    calcs.amortizacion = parseFloat(calculatePercentaje(calcs.cargaFabril, recipe.amortizacion).toFixed(3));
    calcs.utilidad = (parseFloat(calcs.amortizacion / (1 - (recipe.utilidad / 100))) - calcs.amortizacion ).toFixed(3);
    calcs.precioVenta = parseFloat((calcs.amortizacion + parseFloat(calcs.utilidad)).toFixed(3));
    calcs.iva = parseFloat(calculatePercentaje(calcs.precioVenta, recipe.iva).toFixed(3));
    calcs.precioPorcion = parseFloat((calcs.iva / recipe.porciones).toFixed(3));

    $('#costo_base_calculated').html(total);
    $('#carga_fabril_calculated').html(calcs.cargaFabril);
    $('#amortizacion_calculated').html(calcs.amortizacion);
    $('#iva_calculated').html(calcs.iva);
    $('#utilidad_calculated').html(calcs.utilidad);
    $('#precio_venta_calculated').html(calcs.precioVenta);
    $('#precio_porcion_calculated').html(calcs.precioPorcion);

    tableAlreadyGenerated = true;
}

function resetApp() {
    $('input, select').val('');

    recipe = null;
    recipeCreated = false;
    
    $('.needed-quantity').html('unidad');
    $('.unity-equivalency').html('Cada unidad posee una equivalencia distinta');
    
    $('#ingredients_list').html('');
    $('.ingredients-list').css({
        display: 'none'
    });

    $('#recipe_table tbody').html('');

    validatedScreens = [];

    $('.next-screen button').css({
        display: 'block'
    })

    $('#final-buttons').removeClass('d-flex');
    $('#final-buttons').addClass('d-none');

    goToHomeScreen();
}