export class TradingTerminalPage {

    selectMarketType(marketType) {
        /**
        * Selecting from order form dropdown market type. It can be exchange, margin and derivatives
        * @example  selectMarketType('Margin')
        */
        cy.get('li .hfui-dropdown__wrapper').click()
        cy.get('ul[class=with-icon]').contains(marketType).click()
        cy.get('p[class="with-icon"]').should('contain', marketType)
    }
    submitMarketOrder(marketType, amount, orderSide) {
        cy.get('.icon-market-active').click()
        this.selectMarketType(marketType)
        cy.get('.hfui-orderform__input-label').contains('Amount').parent().type(amount)
        cy.get('.hfui-orderform__layout-actions button').contains(orderSide).click()

    }
}

export const onTradingTerminalPage = new TradingTerminalPage()