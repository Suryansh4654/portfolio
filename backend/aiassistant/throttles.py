from rest_framework.throttling import SimpleRateThrottle

class AIChatRateThrottle(SimpleRateThrottle):
    scope = 'ai_chat'
    
    def get_cache_key(self, request, view):
        return f'throttle_ai_{self.get_ident(request)}'
