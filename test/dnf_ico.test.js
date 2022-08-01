/* eslint-disable jest/valid-describe */
/* eslint-disable no-undef */
const DNF_ICO = artifacts.require('DNF_ICO');

require('chai').use(require('chai-as-promised')).should();

contract('DNF_ICO', (accounts) => {
  let dnfIco;

  before(async () => {
    dnfIco = await DNF_ICO.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await dnfIco.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });
});
