<?php
/**
 * Created by IntelliJ IDEA.
 * User: toni.aho
 * Date: 07/07/2018
 * Time: 22.40
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class CvController
{

    public function index()
    {
        $skills = DB::table('skill_category')
            ->join('skill', 'skill_category.id', '=', 'skill.skill_category_id')
            ->select('skill_category.id as skill_category_id', 'skill_category.name_fi as category_name', 'skill.id as skill_id', 'skill.name_fi as skill_name', 'skill.experience')
            ->orderBy('priority')
            ->orderBy('skill.id')
            ->get();
        $results = array();
        foreach ($skills as $skill) {
            $category_index = $this->find_category_index($results, $skill->skill_category_id);
            if ($category_index === FALSE) {
                $category = array("category_id" => $skill->skill_category_id, "category_name" => $skill->category_name, "items" => array());
                array_push($category['items'], $this->create_skill($skill));
                array_push($results, $category);

            } else {
                array_push($results[$category_index]['items'], $this->create_skill($skill));
            }
        }

        return view('cv', [
            'skill_categories' => $results,
            'key_areas' => $this->fetch_key_areas(),
            'projects' => $this->fetch_projects(),
            'certificates' => $this->fetch_certificates(),
            'education' => $this->fetch_education(),
            'profiles' => $this->fetch_by_table('profile')]);
    }

    private function fetch_key_areas()
    {
        $dbSkills = DB::table('key_area')
            ->orderBy('priority')
            ->get()
            ->toArray();
        $key_areas = array_map(function ($area) {
            return ['name_fi' => $area->name_fi, 'name_en' => $area->name_en];
        }, $dbSkills);

        return $key_areas;

    }


    private function fetch_education()
    {
        $dbEducation = DB::table('education')
            ->get()
            ->toArray();
        $education = array_map(function ($area) {
            return ['school_name_fi' => $area->school_name_fi,
                'school_name_en' => $area->school_name_en,
                'time_range' => $area->time_range,
                'examination_name_fi' => $area->examination_name_fi,
                'description_fi' => $area->description_fi
            ];
        }, $dbEducation);
        return $education;

    }

    private function fetch_projects()
    {
        return $this->fetch_by_table('project');
    }

    private function fetch_certificates()
    {
        return $this->fetch_by_table('certificate');

    }

    private function fetch_by_table($table_name)
    {
        return array_map(function ($project) {
            $projectArr = array();

            foreach ($project as $attribute => $value) {
                $projectArr[$attribute] = $value;
            }

            return $projectArr;

        }, DB::table($table_name)
            ->get()
            ->toArray());
    }

    public function add_skill(&$category, $skill)
    {
        $skillArr = array("skill_name" => $skill->skill_name);
        array_push($category['items'], $skillArr);

    }

    private function create_skill($skill)
    {
        return array("skill_name" => $skill->skill_name, "experience" => $skill->experience);
    }

    public function find_category_index($results, $category_id)
    {
        $index = array_search($category_id, array_column($results, 'category_id'));
        return $index;
    }

}
