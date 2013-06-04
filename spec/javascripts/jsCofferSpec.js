// high level feature-ish tests
// pull things out into modules once they're better defined

describe("jsCoffer", function () {
  it("should exist", function () {
    expect(coffer).toBeDefined();
  });
  
  it("should AJAX for some json with a callback", function () {
    var spy = jasmine.createSpy();

    runs(function () {
      coffer.asyncGet('/spec/fixtures/example.json', spy);
    });
    
    waits(500);
    
    runs(function () {
      expect(spy).toHaveBeenCalledWith({"name": "example.json"});
    });
  });
  
  it("should also work synchronously", function () {
    someObject = coffer.syncGet('/spec/fixtures/example2.json');
    
    expect(someObject.name).toBe('example2.json');
  });
  
  it("should let you access nested values easily", function () {
    myCoffer = coffer.create(coffer.syncGet('/spec/fixtures/exampleWithNesting.json'));
    
    expect(myCoffer.extract('one.two.three')).toBe('four');
    expect(myCoffer.extract('one.two.five')).toBe(undefined);    
  });
  
  it("should let you specify default value on undefined", function () {
    myCoffer = coffer.create(coffer.syncGet('/spec/fixtures/exampleWithNesting.json'));
    
    expect(myCoffer.extract('one.two.five', 'cats')).toBe('cats');
  });
  
  it("should be pragmatic about arrays - just take the first entry on extraction be smart later with queries", function () {
    myCoffer = coffer.create([{"a": "b"}, {"c": "d"}]);
    
    expect(myCoffer.extract('a')).toBe('b');
    expect(myCoffer.extract('c')).toBe(undefined);
  });
});
