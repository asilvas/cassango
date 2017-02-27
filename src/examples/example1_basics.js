const client = new Client();

client.file('/examples', 'example1.json').insert({
  example: '1',
  state: 1
}).then(f => {
  console.log('file inserted:', f.toJSON());

  // i don't need this line, just demonstrating reads
  f.select().then(f => console.log('file selected:', f.toJSON()));

  f.update({
    state: 2
  }).then(f => {
    console.log('file updated:', f.toJSON());
    f.remove({ hardDelete: true }).then(f => console.log('file HARD deleted:', f.toJSON()));
  });
});
