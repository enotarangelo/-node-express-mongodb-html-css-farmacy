/**Per eseguire il test: npm test */

// Importing mocha and chai
const mocha = require('mocha')
const chai = require('chai')
const expect = chai.expect

// Importing utils.js where our code is written
const Utils = require('../utils')

describe('Utils', function () {
  
    // We will describe each single test using it
    it('[45.459839, 9.147159] mi aspetto una lista di interi', () => {
        let fare = Utils.string_to_coordinates('[45.459839, 9.147159]')
        expect(fare).to.deep.equal([ 45.459839, 9.147159 ])
    })

    it('[45.459839, 9.147159] mi aspetto restituisca true', () => {
        let fare = Utils.check_coordinates('[45.459839, 9.147159]')
        expect(fare).to.equal(true)
    })

    it('[45.459839, 96.147159] mi aspetto restituisca false', () => {
        let fare = Utils.check_coordinates('[45.459839, 96.147159]')
        expect(fare).to.equal(false)
    })

    it('[hsdfhdhdt] mi aspetto restituisca false', () => {
        let fare = Utils.check_coordinates('[hsdfhdhdt]')
        expect(fare).to.equal(false)
    })

    it('mi aspetto restituisca false', () => {
        let fare = Utils.check_coordinates('')
        expect(fare).to.equal(false)
    })

    it('mi aspetto restituisca 43 min a piedi e 19 in macchina', () => {
        let point1={ lat: 45.459839, lng: 9.147159 };  
        let point2={ lat: 45.459839, lng: 9.177159   };
        let fare = Utils.time_2_point(point1, point2)
        expect(fare).to.deep.equal([43,19])
    })
  
})
