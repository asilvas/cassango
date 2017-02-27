const client = new Client();

client.file('/examples', 'example3.json').insert({
  example: '3',
  state: 1
}).then(f => {
  console.log('file inserted:', f.toJSON());

  f.update({
    state: 2
  }).then(f => {
    console.log('file updated:', f.toJSON());
    f.remove().then(f => {
      console.log('file deleted:', f.toJSON());
      f.history().then(history => {
        console.log('file history:', history);
        f.restore(history[1].version).then(f => {
          console.log('file restored:', f.toJSON());

          f.remove({ hardDelete: true }).then(f => console.log('file HARD deleted:', f.toJSON()));
        });
      });
    })
  });
});
