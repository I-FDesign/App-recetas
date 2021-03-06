<?php
    require_once('./config.php');

    include('./_ajax_saveEmail.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cálculo de recetas</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="stylesheet" href="./css/progress-bar.css">
    <link rel="stylesheet" href="./font-awesome/css/font-awesome.min.css">
</head>
<body>

    <header>
        <div class="container">
            <div class="banner d-flex">
                <div class="icon">
                    <img src="./img/header-icon.png" alt="">
                </div>
                <div class="logo d-flex align-items-end">
                    <img src="./img/header-logo.png" alt="">
                </div>
            </div>
        </div>
    </header>

    <div class="content">
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-4">Cálculo de recetas</h1>
              <p class="lead">Aquí podras calcular el costo de tu receta en base a los ingredientes y a ciertos parametros económicos.</p>
            </div>
        </div>
        <div class="container">
            <div class="top">
                <div class="title text-center mb-4 mt-4">
                    <h2 style='font-size: 25px'>Comencemos de una vez</h2>
                    <hr>
                </div>
                <ol class="progress-bar-recipe mt-4 pt-4">
                    <li class="is-active" id='screen_button_1' data-screen = '1'
                        onclick ="nextScreen('screen_1', event)">
                        <div class="number-container">
                            <p class="number">1</p>
                        </div>
                        <span>Algunos datos previos </span>
                    </li>  
                    <li id='screen_button_2' data-screen = '2'
                        onclick ="nextScreen('screen_2', event)">
                        <div class="number-container">
                            <p class="number">2</p>
                        </div>
                        <span>Ingredientes de la receta</span>
                    </li>  
                    <li id='screen_button_3' data-screen = '3'
                        onclick ="nextScreen('screen_3', event)">
                        <div class="number-container">
                            <p class="number">3</p>
                        </div>
                        <span>Ya casi estamos...</span>
                    </li>
                    <li id='screen_button_4' data-screen = '4'
                        onclick ="nextScreen('screen_4', event)">
                        <div class="number-container">
                            <p class="number">4</p>
                        </div>
                        <span>Listo!, ya puedes ver tu receta</span>
                    </li>   
                </ol>
            </div>
            <div class="bottom mt-4 pt-4 mb-4 pb-4">
                <div class="recipe-slider">
                    <div class="first" id='screen_1'>
                        <div class="form-group recipe-name">
                            <label for="recipeName">Nombre de la receta</label>
                            <input type="text" class="form-control" id="recipeName" aria-describedby="recipeNameHelp" placeholder="Ingresa un nombre">
                            <small id="recipeNameHelp" class="form-text text-muted">Puedes volver para cambiarlo si te arrepientes!</small>
                        </div>

                        <div class="form-group">
                            <label for="contactEmail">Email personal</label>
                            <input type="email" class="form-control" id="contactEmail" aria-describedby="contactEmailHelp" placeholder="Ingresa un nombre">
                            <small id="contactEmailHelp" class="form-text text-muted">No te enviaremos nada, es solo para llevar un control!</small>
                        </div>
                    </div>
                    <div class="second" id='screen_2'>
                        <div class="row">
                            <div class="col-12 col-lg-6">
                                <div class="form-group recipe-name">
                                    <label for="ingredientName">Nombre ingrediente</label>
                                    <input type="text" class="form-control" id="ingredientName" placeholder="Ejemplo: Azúcar morena">
                                </div>
                            </div>
                            <div class="col-12 col-lg-6">
                                <div class="form-group recipe-name">
                                    <label for="ingredientUnity">Medida ingrediente</label>
                                    <select id="ingredientUnity" class="form-control"
                                        onchange='recipeUnityChanged(event)'>
                                        <option value="">Unidad</option>
                                        <option value="kg">Kilogramos</option>
                                        <option value="lt">Litros</option>
                                        <option value="pz">Pieza</option>
                                        <option value="lb">Libras</option>
                                        <option value="mt">Metros</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <hr>

                        <div class="row">
                            <div class="col-12 col-lg-6">
                                <div class="form-group recipe-name">
                                    <label for="ingredientBuyQuantity">
                                        Cantidad de la compra (En <strong class='needed-quantity'>unidad</strong>)
                                    </label>
                                    <input type="text" class="form-control" id="ingredientBuyQuantity" placeholder="Ejemplo: 200">
                                    <small class="form-text text-muted unity-equivalency">
                                        Cada unidad posee una equivalencia distinta
                                    </small>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6">
                                <div class="form-group recipe-name">
                                    <label for="ingredientPrice">Costo compra</label>
                                    <input type="text" class="form-control" id="ingredientPrice" placeholder="Ejemplo: 350">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-group recipe-name">
                                    <label for="ingredientQuantity">
                                        Cantidad necesaria (solo número, en <strong class='needed-quantity'>unidad</strong>)
                                    </label>
                                    <input type="text" class="form-control" id="ingredientQuantity" placeholder="Ejemplo: 200">
                                    <small class="form-text text-muted unity-equivalency">
                                        Cada unidad posee una equivalencia distinta
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div class="ingredients-list mb-4" style='display: none'>
                            <h2 class='mb-2 mt-2'>Ingredientes:</h2>
                            <ul class="list-group" id='ingredients_list'>
                            </ul>
                        </div>

                        <div class="add-ingredient pb-4 text-right">
                            <button onclick='addIngredient()' class='btn btn-success'>
                                <i class="fa fa-save"></i>
                                Agregar ingrediente
                            </button>
                        </div>
                    </div>
                    <div class="third" id='screen_3'>
                        <div class="row">
                            <div class="col-12 text-right">
                                <div class="buttons mt-1">
                                    <a href='https://flavoo.club/glosario'  target="_blank" 
                                       class='btn btn-outline-primary mr-2'>
                                        Glosario
                                    </a>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6">
                                <div class="form-group carga-fabril">
                                    <label for="cargaFabril">
                                        Carga fabril %
                                        <strong>(¿? Revisar glosario)</strong>
                                    </label>
                                    <input type="text" class="form-control"  data-name='Carga fabril'
                                        id="cargaFabril" placeholder="Ejemplo: 15">
                                </div>
                            </div>
                            <div class="col-12 col-lg-6">
                                <div class="form-group amortizacion">
                                    <label for="amortizacion">
                                        Amortización %
                                        <strong>(¿? Revisar glosario)</strong>
                                    </label>
                                    <input type="text" class="form-control"  data-name='Amortización'
                                        id="amortizacion" placeholder="Ejemplo: 20">
                                </div>
                            </div>
                        </div>

                        <hr>

                        <div class="row">
                            <div class="col-12 col-lg-6">
                                <div class="form-group utilidad">
                                    <label for="utilidad">
                                        Utilidad %
                                        <strong>(¿? Revisar glosario)</strong>
                                    </label>
                                    <input type="text" class="form-control"  data-name='Utilidad'
                                        id="utilidad" placeholder="Ejemplo: 30">
                                </div>
                            </div>
                            <div class="col-12 col-lg-6">
                                <div class="form-group iva">
                                    <label for="iva">IVA %</label>
                                    <input type="text" class="form-control"  data-name='IVA'
                                        id="iva" placeholder="Ejemplo: 17">
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-12">
                                <div class="form-group porciones">
                                    <label for="porciones">Porciones a preparar</label>
                                    <input type="text" class="form-control"  data-name='Porciones'
                                        id="porciones" placeholder="Ejemplo: 2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fourth" id='screen_4'>
                        <div class="row mb-2 mt-2">
                            <div class="screen-header col-12" style='display: none'>
                                <div class="header-container d-flex 
                                    justify-content-between align-items-start">
                                    <div class="banner-images mb-4 d-flex">
                                        <div class="icon">
                                            <img style='height: 100px'
                                            src="./img/header-icon.png" alt="">
                                        </div>
                                        <div class="logo d-flex align-items-end">
                                            <img style='height: 100px'
                                            src="./img/header-logo.png" alt="">
                                        </div>
                                    </div>
                                    <div class="site-url">
                                        <p>www.flavoo.club</p>
                                    </div>
                                </div>
                            </div>
                            <div class="title col-12 col-md-6">
                                <h3>
                                    Nombre receta: <span id='recipe_name_placeholder'></span>
                                </h3>
                            </div>
                        </div>
                        <div class="subtitle mt-2">
                            <h2>INGREDIENTES:</h2>
                            <hr>
                        </div>

                        <div class="ingredients mt-4 mb-4">
                            <div class="table-responsive">
                                <table class="table" id='recipe_table'>
                                    <thead class="thead-light">
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Costo</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <hr>

                        <div class="additional-data">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <ul>
                                        <li>Carga fabril %: <strong id='carga_fabril_choosed'></strong></li>
                                        <li>Amortización %: <strong id='amortizacion_choosed'></strong></li>
                                        <li>Utilidad %: <strong id='utilidad_choosed'></strong></li>
                                        <li>IVA %: <strong id='iva_choosed'></strong></li>
                                        <li># Porciones: <strong id='porciones_choosed'></strong></li>
                                    </ul>
                                </div>
                                <div class="col-12 col-md-6 text-right">
                                    <ul>
                                        <li>Costo base: <strong id='costo_base_calculated'></strong></li>
                                        <li>Carga fabril: <strong id='carga_fabril_calculated'></strong></li>
                                        <li>Amortización: <strong id='amortizacion_calculated'></strong></li>
                                        <li>Utilidad: <strong id='utilidad_calculated'></strong></li>
                                        <li>Precio venta: <strong id='precio_venta_calculated'></strong></li>
                                        <li>IVA: <strong id='iva_calculated'></strong></li>
                                        <li>Precio porción: <strong id='precio_porcion_calculated'></strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="alert-message">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> <span id="alert_message"></span>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="bottom-buttons">
    
                    <div class="final-buttons d-flex justify-content-around text-center" 
                        id='final-buttons' style='display: none !important'>
                        <button onclick='resetApp()'
                            class="btn btn-outline-success pt-2 pb-2">
                            <i class="fa fa-plus" style='font-size: 18px; margin-bottom: -10px;'></i>
                            Nueva receta
                        </button>
    
                        <button onclick='printData()'
                            class="btn btn-outline-success pt-2 pb-2">
                            <i class="fa fa-print" style='font-size: 18px; margin-bottom: -5px;'></i>
                            Imprimir
                        </button>
                    </div>

                    <div class="button next-screen text-center d-flex justify-content-around mt-2">
                        <button onclick='nextScreen(null, null, true)' style='display: none'
                            class="btn btn-outline-primary last-screen w-50 pt-2 pb-2 mr-1">
                            <i class="fa fa-angle-double-left"></i>
                            Paso anterior
                        </button>
                        <button onclick='nextScreen()'
                            class="btn btn-outline-success w-50 pt-2 pb-2 ml-1">
                            Avanzar
                            <i class="fa fa-angle-double-right"></i>
                        </button>
                    </div>

                </div>
                
            </div>
        </div>
    </div>


    <script src='./js/jquery.js'></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src='./js/models/ingredient-model.js'></script>
    <script src='./js/models/recipe-model.js'></script>
    <script src='./js/application.js'></script>
    <script src='./js/recipes.js'></script>
</body>
</html>