const client = new Client();

const files = [
  client.file('/examples', 'example2_file1.json').insert({}),
  client.file('/examples', 'example2_file2.json').insert({}),
  client.file('/examples', 'example2_file3.json').insert({}),
  client.file('/examples', 'example2_file4.json').insert({}),
  client.file('/examples', 'example2_file5.json').insert({}),
  client.file('/examples', 'example2_file6.json').insert({}),
  client.file('/examples', 'example2_file7.json').insert({}),
  client.file('/examples', 'example2_file8.json').insert({}),
  client.file('/examples', 'example2_file9.json').insert({}),
  client.file('/examples', 'example2_file10.json').insert({}),
  client.file('/examples', 'example2_file11.json').insert({}),
  client.file('/examples', 'example2_file12.json').insert({})
];

Promise.all(files).then(() => {
  client.dir('/examples').list(10).then(result => {
    console.log('files:', result.files.map(f => f.file));

    result.nextPage && client.dir('/examples').list(10, result.nextPage).then(result => console.log('more files:', result.files.map(f => f.file)));
  });
});
