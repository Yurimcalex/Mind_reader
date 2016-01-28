    //----------------------------prepare for main game testing-----------------
    var startSuite = [
        {id: 18, dx: 1800, make: model.Card.prototype.make},
        {id: 26, dx: 2600, make: model.Card.prototype.make},
        {id: 22, dx: 2200, make: model.Card.prototype.make},
        {id: 23, dx: 2300, make: model.Card.prototype.make},
        {id: 6, dx: 600, make: model.Card.prototype.make},
        {id: 8, dx: 800, make: model.Card.prototype.make},
        {id: 31, dx: 3100, make: model.Card.prototype.make},
        {id: 21, dx: 2100, make: model.Card.prototype.make},
        {id: 32, dx: 3200, make: model.Card.prototype.make},
        {id: 12, dx: 1200, make: model.Card.prototype.make},
        {id: 3, dx: 300, make: model.Card.prototype.make},
        {id: 20, dx: 2000, make: model.Card.prototype.make},
        {id: 14, dx: 1400, make: model.Card.prototype.make},
        {id: 1, dx: 100, make: model.Card.prototype.make},
        {id: 30, dx: 3000, make: model.Card.prototype.make},
        {id: 24, dx: 2400, make: model.Card.prototype.make},
        {id: 33, dx: 3300, make: model.Card.prototype.make},
        {id: 7, dx: 700, make: model.Card.prototype.make},
        {id: 27, dx: 2700, make: model.Card.prototype.make},
        {id: 4, dx: 400, make: model.Card.prototype.make},
        {id: 13, dx: 1300, make: model.Card.prototype.make}
    ];
    // из 21 карты нужно запомнить любую.
    //view.showCards(startSuite);

    //1. раскладываем в 3 столбца, запоминаем где карта, конкатинируем для отображения и отобоажаем на экране
    //var suite1 = model.laySuiteIn3rows(startSuite);
    //var tstSuite1 = suite1.row1.concat(suite1.row2).concat(suite1.row3);
    //view.showCards(tstSuite1);
    //-------------что выше вешаем на next

    //собираем карты для следующего этапа согласно размещению запомненой карты
    //tstSuite1 = suite1.row1.concat(suite1.row2).concat(suite1.row3);

    //2. раскладываем в 3 столбца, конкатинируем для отображения и отобоажаем на экране
    //var suite2 = model.laySuiteIn3rows(tstSuite1);
    //var tstSuite2 = suite2.row1.concat(suite2.row2).concat(suite2.row3);
    //view.showCards(tstSuite2);

    //собираем карты для следующего этапа согласно размещению запомненой карты
    //tstSuite2 = suite2.row1.concat(suite2.row2).concat(suite2.row3);

    //3. раскладываем в 3 столбца, конкатинируем для отображения и отобоажаем на экране
    //var suite3 = model.laySuiteIn3rows(tstSuite2);
    //var tstSuite3 = suite3.row1.concat(suite3.row2).concat(suite3.row3);
    //view.showCards(tstSuite3);

    //собираем карты для следующего этапа согласно размещению запомненой карты
    //tstSuite3 = suite3.row2.concat(suite3.row1).concat(suite3.row3);

    //посрединке наша
    //view.showCards(tstSuite3);

