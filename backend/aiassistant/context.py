import os
import json
from functools import lru_cache
from django.conf import settings

def dict_to_yaml(data, indent=0):
    lines = []
    spacer = '  ' * indent
    if isinstance(data, dict):
        for k, v in data.items():
            if isinstance(v, (dict, list)):
                lines.append(f'{spacer}{k}:')
                lines.append(dict_to_yaml(v, indent + 1))
            else:
                lines.append(f'{spacer}{k}: {v}')
    elif isinstance(data, list):
        for item in data:
            if isinstance(item, (dict, list)):
                item_lines = dict_to_yaml(item, indent + 1).strip()
                lines.append(f'{spacer}- ' + item_lines.lstrip())
            else:
                lines.append(f'{spacer}- {item}')
    else:
        lines.append(f'{spacer}{data}')
    return '\n'.join(line for line in lines if line)

class ResumeContextLoader:
    @classmethod
    @lru_cache(maxsize=1)
    def load_all_context(cls):
        context_parts = []
        files = ['profile.json', 'skills.json', 'projects.json', 'achievements.json', 'career_narrative.json']
        
        for filename in files:
            file_path = os.path.join(settings.BASE_DIR, 'resume_context', filename)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    # Convert to YAML format to avoid curly braces and optimize tokens
                    yaml_data = dict_to_yaml(data)
                    yaml_filename = filename.replace('.json', '.yaml')
                    context_parts.append(f"--- {yaml_filename} ---\n{yaml_data}")
            except Exception as e:
                print(f"Error loading {filename}: {e}")
                
        return "\n\n".join(context_parts)
