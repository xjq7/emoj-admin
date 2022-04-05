import SparkMD5 from 'spark-md5';

export function calHash(file: File) {
  return new Promise((r, j) => {
    const blobSlice = File.prototype.slice;
    const chunkSize = 1024 * 1024 * 2; // Read in chunks of 2MB
    const chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    const spark = new SparkMD5.ArrayBuffer();

    const fileReader = new FileReader();

    function loadNext() {
      if (!file) return;
      const start = currentChunk * chunkSize;
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      if (!fileReader) return;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    fileReader.onload = (e: any) => {
      spark.append(e.target.result); // Append array buffer
      currentChunk++;

      if (currentChunk < chunks) {
        // const progress = parseInt(String((currentChunk / chunks) * 100), 10);
        // setFileStat((prev) => ({ ...prev, progress }));
        loadNext();
      } else {
        const hash = spark.end();
        // setFileStat((prev) => ({ ...prev, hash, progress: 100, status: 'success' }));
        r(hash);
      }
    };

    fileReader.onerror = () => {
      // setFileStat((prev) => ({ ...prev, status: 'exception' }));
      j();
    };

    loadNext();
  });
}
