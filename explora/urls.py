
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.urls import path

from explora import views

urlpatterns = [
                
    #Ajax
    # path('get_list_product', views.explore.get_list_product, name='get_list_product'),
    path('get_info_product', views.explore.get_info_product, name='get_info_product'),
    path('get_list_colonnes', views.explore.get_list_colonnes, name='get_list_colonnes'),
    path('get_list_mots_cle', views.explore.get_list_mots_cle, name='get_list_mots_cle'),
    path('get_overview', views.explore.get_overview, name='get_overview'),
    path('validate_nouveau', views.auth.validate_nouveau, name='validate_nouveau'),
    path('validate_login_user', views.auth.validate_login_user, name='validate_login_user'),
    # path('save_questionnary', views.quaero.save_questionnary, name='save_questionnary'),
    path('suppr_questionnary', views.quaero.suppr_questionnary, name='suppr_questionnary'),
    path('generate_response', views.my_chatbot.chatbot.generate_response, name='generate_response'),
    path('delete_questionnary/<str:id_questionnary>/',views.api_angular.angular.delete_questionnary, name='delete_questionnary'),
    path('get_questionnary/<str:id_questionnary>/',views.api_angular.angular.get_questionnary, name='get_questionnary'),
    path('get_results_fermee/<str:id_questionnary>/<str:id_question>',views.api_angular.visualize.graph.get_results_fermee, name='get_results_fermee'),
    path('save_questionnary/<str:content>/',views.api_angular.angular.save_questionnary, name='save_questionnary'),
    path('update_questionnary/<str:id_questionnary>/<str:content>/',views.api_angular.angular.update_questionnary, name='update_questionnary'),
    path('get_lmstudio_response',views.api_angular.lmstudio.server.get_lmstudio_response, name='get_lmstudio_response'),

    path('insert_result/<str:content>/<str:id_questionnary>/',views.api_angular.angular.insert_result, name='insert_result'),
    # path('update_result/<str:id_questionnary>/<str:content>/',views.api_angular.angular.update_result, name='update_result'),


    path('api/get_csrf_token', views.api_angular.angular.get_csrf_token, name='get_csrf_token'),
    path('api/set_csrf_token',views.api_angular.angular.set_csrf_token)
]

urlpatterns += i18n_patterns (
    path('admin/', admin.site.urls),
    path('', views.auth.index, name='index'),
    path('index', views.auth.index, name='index'),

    #quaero
    path('login', views.quaero.login, name='login'),
    path('new_questionnary', views.quaero.new_questionnary, name='new_questionnary'),
    path('my_questionnary', views.quaero.my_questionnary, name='my_questionnary'),
    path('publish_questionnary', views.quaero.publish_questionnary, name='publish_questionnary'),
    path('telecharger_list_destinataires_csv', views.quaero.telecharger_list_destinataires_csv, name='telecharger_list_destinataires_csv'),
    path('edit_questionnary/<int:id_questionnary>/', views.api_angular.angular.update_questionnary, name='edit_questionnary'),
    
    path('display_questionnary/<int:id_questionnary>/', views.quaero.display_questionnary, name='display_questionnary'),

    #collect
    path('display_collect', views.collect.display_collect, name='display_collect'),
    path('telecharger_csv', views.collect.telecharger_csv, name='telecharger_csv'),
    path('telecharger_pdf', views.collect.telecharger_pdf, name='telecharger_pdf'),
    path('telecharger_fichier_json', views.collect.telecharger_fichier_json, name='telecharger_fichier_json'),

    #clean
    path('delete_column', views.clean.delete_column, name='delete_column'),
    path('display_clean', views.clean.display_clean, name='display_clean'),

    #explore
    path('display_explore', views.explore.display_explore, name='display_explore'),
    path('index_document', views.explore.index_document, name='index_document'),

    #visualize
    path('lineplot', views.visualize.lineplot, name='lineplot'),

    #divers
    path('pyscript', views.zdivers.pyscript, name='pyscript'),
    path('d3js_word_cloud', views.zdivers.d3js_word_cloud, name='d3js_word_cloud'),
    path('chat', views.my_chatbot.chatbot.chat, name='chat'),
    path('user', views.api_angular.angular.userAll, name='user'),
    
    path('questionnary', views.api_angular.angular.questionnaryAll, name='questionnary')
)

