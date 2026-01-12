from django import forms
from django.core.exceptions import ValidationError
from .models import Contact

class ContactForm(forms.ModelForm):
    name = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'input input-boarded w-full',
            'placeholder': 'Contact Name'
        })
    )

    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'class': 'input input-boarded w-full',
            'placeholder': 'Email Address'
        })
    )

    image = forms.FileField(
        widget=forms.FileInput(attrs={
            'class': 'file-input file-input-bordered w-full',
            'accept': 'image/*'
        }),
        required=False,
        help_text='Upload a profile image (JPG, PNG, GIF, WEBP)'
    )

    document = forms.FileField(
        widget=forms.FileInput(attrs={
            'class': 'file-input file-input-boarded w-full',
            'accept': '.pdf,.doc,.docx,.txt'
        }),
        required=False,
        help_text='Upload a document (PDF, DOC, DOCX, TXT)'
    )

    def clean_name(self):
        name = self.cleaned_data['name']
        # Check if name already exist
        if name.startswith('X'):
            raise ValidationError("No names beginning with X!")
        return name
    

    def clean_email(self):
        email = self.cleaned_data['email']
    # Check if the email is already in use
        if Contact.objects.filter(user=self.initial.get('user'), email=email).exists():
            raise ValidationError("You already have a contact with this email address.")
        return email


    class Meta:
        model = Contact
        # field = (
        #     'name', 'email'
        # )
        fields = 'name', 'email', 'image', 'document'
