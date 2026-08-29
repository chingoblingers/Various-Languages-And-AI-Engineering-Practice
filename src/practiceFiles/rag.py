chunks = [
    {"id": 1, "content": "React uses components to build user interfaces.", "source": "react.md"},
    {"id": 2, "content": "Embeddings represent text as vectors.", "source": "rag.md"},
    {"id": 3, "content": "Vector databases can perform similarity search.", "source": "rag.md"},
    {"id": 4, "content": "Express middleware runs during the request response cycle.", "source": "express.md"},
]

def get_chunks_by_source(chunks, source):
    return [chunk for chunk in chunks if chunk["source"] == source]

def get_total_words(chunks):
    total_chunks = 0
    for chunk in chunks:
      total_chunks += len(chunk["content"].split())
    return total_chunks

def get_long_chunks(chunks, minimum_words):
    return [chunk for chunk in chunks if len(chunk['content'].split()) >= minimum_words]

def count_chunks_by_source(chunks):
    source_chunks = {}
    for chunk in chunks:
        if chunk["source"] not in source_chunks:
            source_chunks[chunk['source']] = 1
        else:
            source_chunks[chunk["source"]] += 1
    return source_chunks

def get_source_word_totals(chunks):
    total_words_by_source = {}
    for chunk in chunks:
        chunk_word_count = len(chunk["content"].split())
#        if chunk['source'] not in total_words_by_source:
#            total_words_by_source[chunk['source']] = chunk_word_count
#        else:
#            total_words_by_source[chunk['source']] += chunk_word_count
#-- Here is another way you can write it without the if else. 
   current_chunk_total = total_words_by_source.get(chunk['source'], 0)
   overall_chunk_total = current_chunk_total + chunk_word_count
   total_words_by_source[chunk['source']] = overall_chunk_total
#  Heres a compressed version once your better at the above
# total_words_by_source[chunk["source"]] = (
#    total_words_by_source.get(chunk["source"], 0) + chunk_word_count) 
    return total_words_by_source
    
    