print(
    'Start #################################################################'
);

db = db.getSiblingDB('seeWeather');
db.createUser({
    user: 'kacper',
    pwd: 'kacper123',
    roles: [{ role: 'readWrite', db: 'seeWeather' }],
});
db.createCollection('users');

print('END #################################################################');
