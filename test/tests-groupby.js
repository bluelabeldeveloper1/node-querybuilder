var should = require('chai').should();
var expect = require('chai').expect;
var QueryBuilder = require('../lib/query_builder.js');
var qb = new QueryBuilder();

describe('group_by()', function() {
	it('should exist', function() {
		should.exist(qb.group_by);
	});
	it('should be a function', function() {
		qb.group_by.should.be.a('function');
	});
	it('should have an array to put fields into', function() {
		qb.should.have.property('groupByArray');
	});
	it('should have an empty array to put fields into at the beginning', function() {
		qb.groupByArray.should.be.empty;
	});
	it('should accept a single field in string form', function() {
		qb.resetQuery();
		qb.group_by('planet_type');
		qb.groupByArray.should.eql(['`planet_type`']);
	});
	it('should accept a multiple fields delimited by commas', function() {
		qb.resetQuery();
		qb.group_by('planet_type, planet_position');
		qb.groupByArray.should.eql(['`planet_type`','`planet_position`']);
	});
	it('should accept an array of fields', function() {
		qb.resetQuery();
		qb.group_by(['planet_type', 'planet_position']);
		qb.groupByArray.should.eql(['`planet_type`','`planet_position`']);
	});
	it('should not accept anything but a string or an array of strings', function() {
		qb.resetQuery();
		expect(function() { qb.group_by(); 		}, 'nothing provided').to.throw(Error);
		expect(function() { qb.group_by(null); 	}, 'null provided').to.throw(Error);
		expect(function() { qb.group_by(false); }, 'false provided').to.throw(Error);
		expect(function() { qb.group_by(true); 	}, 'true provided').to.throw(Error);
		expect(function() { qb.group_by({}); 	}, 'empty object provided').to.throw(Error);
		expect(function() { qb.group_by(3); 	}, 'integer provided').to.throw(Error);
		expect(function() { qb.group_by(3.5); 	}, 'float provided').to.throw(Error);
		expect(function() { qb.group_by([]); 	}, 'empty array provided').to.throw(Error);
		expect(function() { qb.group_by([1,2]); }, 'array of numbers provided').to.throw(Error);
		expect(function() { qb.group_by(''); 	}, 'empty string provided').to.throw(Error);
		
		// valid string
		expect(function() { qb.group_by('planet_type');	  }, 'valid string provided').to.not.throw(Error);
		expect(function() { qb.group_by(['planet_type']); }, 'array of string(s) provided').to.not.throw(Error);
		
	});
});