<?php

if (!isset($_REQUEST['data'])) {
  http_response_code(403);
  header('Location: //netbiblio.ru/404.html');
  exit();
}

$response['status'] = 'Назначение запроса не определено.';
$data = json_decode($_REQUEST['data'], true);

if (isset($data['answer']) && $data['answer'] !== '1997') {
  $response['status'] = 'Ошибка отправки сообщения. Попробуйте ещё раз.';
} else {
  $db_data = [
    $data['name'],
    $data['email'],
    $data['message'],
    $_SERVER['HTTP_USER_AGENT']
  ];

  $query = 'INSERT INTO tickets (name, email, message, browser) VALUES ("' . implode('", "', $data). '")';
  if (set_db_data($query)) {
    $response['status'] = '<p>Спасибо за помощь! Фрагмент передан дежурному редактору «Netbiblio».</p><p>Если отзыв содержателен, мы обязательно опубликуем его! Если текст действительно содержит указанную ошибку, мы исправим её в ближайшее время.</p>';
  }
}

header('Access-Control-Allow-Origin: netbiblio.efiand.ru');
header('Content-Type: application/json');
exit(json_encode($response, JSON_UNESCAPED_UNICODE));
