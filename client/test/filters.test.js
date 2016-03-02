
describe('filters', function() {

  beforeEach(module('filters')); //same as using angular.mock.module. Have to roll this up because moneyExchange is not directly connected to any registered angular module

  describe('money filter', function() {

    var format1 = {
      symbol: '¥',
      rate: 2
    };

    var format2 = {
      symbol: '$',
      rate: 1
    };

    var moneyExchangeFilter;

    beforeEach(inject(_$filter_ => {
      var $filter = _$filter_;
      moneyExchangeFilter = $filter('moneyExchange'); //Use angular $filter service to instantiate an instance for moneyExchange
    }));

    it('should convert boolean values to unicode checkmark or cross', () => {
      assert.equal(moneyExchangeFilter(1000, format1), '¥ 500 ');
      assert.equal(moneyExchangeFilter(1000, format2), '$ 1k');
      assert.equal(moneyExchangeFilter(1000000, format2), '$ 1m');
  });
});

});
