django-autocomplete-light-selectize
===================================

Selectize widgets for Django Autocomplete light

Add to INSTALLED_APPS:

```
    'dal',
    'dal_select2',
    'dal_selectize',
```

Can coexist with select2 but is not recommended

In your forms.py:

```from dal_selectize.widgets import *

class EmailMessageForm(forms.Form):
    contact =  forms.ModelMultipleChoiceField(
                label=_('Contact'),
                queryset=EmailAddress.objects.all(),
                #~ widget=autocomplete.ModelSelect2Multiple(url='emailaddress_autocomplete', attrs={'data-html': 'true'})
                widget=ModelSelectizeMultiple(url='emailaddress_autocomplete')
                )
```

This widget does data-html by default.

In your autocomplete views:

```
from dal_selectize.views import SelectizeQuerySetView

#~ class ContactAutocomplete(autocomplete.Select2QuerySetView):
class ContactAutocomplete(SelectizeQuerySetView):
    model = Contact
        
    def get_queryset(self):
        if not self.request.user.is_authenticated():
            return self.model.objects.none()
        qs = self.model.objects.all()
        if self.q:
            qs = qs.filter(Q(name__icontains=self.q) | Q(surname__icontains=self.q) | Q(nif__icontains=self.q))
        return qs
        
    def get_result_label(self, item):
        return u"[#%s] %s %s %s" % (item.id, item.name, item.surname, item.nif)
```

More to come:
- Forwarding not tested yet
- Plugins
- Tags mode
- Option Groups 
