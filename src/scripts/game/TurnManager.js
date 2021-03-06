function TurnManager(encounter, levelManager, namesManager, iconTemplates) {
    this.encounter = encounter;
    this.levelManager = levelManager;
    this.namesManager = namesManager;
    this.iconTemplates = iconTemplates;
}

// Iterates through towns array and, if possible, generate soldiers equals to the quantity variable; with strength equals to quality variable
TurnManager.prototype.generateSoldiers = function(player, players){
    let quantity, quality, cell, emptyCell, annotation, movements, image, iterations, html, mobTemplate, typeTag, factionTag,
        towns = player.units.towns,
        mobs = player.units.mobs;

    towns.forEach((town, townsIndex) => {
        quantity = town.stats.quantity;
        quality = town.stats.quality;

        cell = town.cell.replace('icon','').split("");

        iterations = [
            ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
            ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
        ];

        // TODO improve this, too complex
        // Stop soldiers appearing in non-existant cells
        if (parseInt(cell[0]) === 7){
            iterations.splice(0, 1);

        } else if (parseInt(cell[0]) === 0){
            iterations.splice(2, 1);
        }

        if (parseInt(cell[1]) === 7){
            iterations.splice(1, 1);

        } else if (parseInt(cell[1]) === 0){
            iterations.splice(3, 1);
        }

        iterations.some((iteration, iterationsIndex) => {
            if ($(iteration + ' img').attr('id') === undefined){
                emptyCell = iteration.replace('#cell', '').split("");

                randomName = this.namesManager.getRandomName('mob', player.name);

                if (player.name === 'human'){
                    annotation = 'a';
                    movements = 2;
                    typeTag = 'Soldier';
                    factionTag = 'Roman';
                    mobTemplate = this.iconTemplates.getHumanMob;

                } else if (player.name === 'ai'){
                    annotation = 'e';
                    movements = 1;
                    typeTag = 'Soldier';
                    factionTag = 'Barbarian';
                    mobTemplate = this.iconTemplates.getAIMob;
                }

                id = 'icon' + emptyCell[0] + emptyCell[1] + annotation;

                $(iteration[iterationsIndex]).html(mobTemplate.apply(this.iconTemplates, [id, randomName, movements, town.stats.quality]));

                mobs.push(
                    {cell: id, player: player.name, name: randomName, movements: movements, totalMovements: movements, strength: quality, typeTag: typeTag, factionTag: factionTag});

                // Resolve possible encounters when this unit appears besides other enemy unit
                this.encounter.check(mobs[mobs.length - 1], players);

                quantity--;
                // Stop when there's no more quantity
                return quantity <= 0;
            }
        });
    });
}

// End current player turn, and provides 3 gold to each player
TurnManager.prototype.endTurn = function(currentMapLevel, players){
    let id;

    this.generateSoldiers(players.human, players);
    players.ai.performTurn();

    this.generateSoldiers(players.ai, players);
    players.human.setGold(players.human.gold + 3);
    players.ai.gold += 3;

    players.ai.units.mobs.forEach(mob => {
        this.encounter.check(mob, players);

        mob.movements = mob.totalMovements;
    });

    players.human.units.mobs.forEach(mob => {
        this.encounter.check(mob, players);

        mob.movements = mob.totalMovements;

        id = mob.cell.replace('icon', '');

        // If it's a Roman Soldier, colour it in order to indicate that it can move again 
        $('#cell' + id[0] + id[1]).html(this.iconTemplates.getHumanMob(id, mob.name, mob.movements, mob.strength));
    });

    return this.levelManager.checkEndOfLevelCondition(currentMapLevel, players);
}