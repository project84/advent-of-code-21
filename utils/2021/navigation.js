export function checkIllegalChunks(reading) {
	
	// Find any minimum length chunks in the reading, if none exit 
	let chunks = reading.value.match(/[\[\<\{\(][\]\>\}\)]/g);
    if (!chunks) {
		return reading;
	}
	
	// Determine if any of the chunks are invalid
	let invalidChunks = chunks.filter(chunk => !chunk.match(/(\<\>)|(\[\])|(\{\})|(\(\))/g));

	if (invalidChunks.length) {
		// Return the illegal character of the first invalid chunk found
		reading.illegalCharacter = invalidChunks[0][1];
		return reading;
	} else {
		// Otherwise, remove found chunks from the reading and continue to recursively scan chunks in the reading
		chunks.forEach(chunk => {
			reading.value = reading.value.replace(chunk, '');
		});

		return checkIllegalChunks(reading);
	}
		
}