import json
from django.http import StreamingHttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .services import AIAssistantService
from .throttles import AIChatRateThrottle

class ChatView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [AIChatRateThrottle]
    
    def post(self, request):
        message = (request.data.get('message') or '').strip()
        history = request.data.get('history') or []
        
        if not message:
            return JsonResponse({'error': 'Message is required'}, status=400)
        
        if len(message) > 500:
            return JsonResponse({'error': 'Message too long (max 500 chars)'}, status=400)
        
        service = AIAssistantService()
        
        def event_stream():
            try:
                for token in service.stream_response(message, history):
                    data = json.dumps({'content': token})
                    yield f'data: {data}\n\n'
                yield 'data: [DONE]\n\n'
            except Exception as e:
                print(f"ChatView event_stream exception: {e}")
                fallback = service._generate_fallback_response(message)
                data = json.dumps({'content': fallback})
                yield f'data: {data}\n\n'
                yield 'data: [DONE]\n\n'
        
        response = StreamingHttpResponse(
            event_stream(),
            content_type='text/event-stream'
        )
        response['Cache-Control'] = 'no-cache'
        response['X-Accel-Buffering'] = 'no'
        return response
