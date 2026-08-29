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

print(get_total_words(chunks))