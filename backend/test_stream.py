import os
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_google_genai import ChatGoogleGenerativeAI

try:
    key = "AIzaSyBNmo1KYIfvdFpj-H3n50A7PSrgK7wNe5w"
    llm = ChatGoogleGenerativeAI(
        model="gemini-3.5-flash",
        google_api_key=key,
        temperature=0.2
    )
    print("LLM initialized!")
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant."),
        MessagesPlaceholder("history"),
        ("human", "{user_message}")
    ])
    
    chain = prompt | llm
    
    print("Starting stream:")
    for chunk in chain.stream({"history": [], "user_message": "Tell me a 1-word greeting"}):
        print(f"Chunk type: {type(chunk)}, content type: {type(chunk.content)}, content: {chunk.content}")
        
except Exception as e:
    import traceback
    print("ERROR DURING STREAMING:")
    traceback.print_exc()
